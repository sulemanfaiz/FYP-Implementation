const Transaction = require("../models/transaction.model.js");
const Property = require("../models/listing.js");
const User = require("../models/user.js");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const sendEmail = require("../utils/Sendemail.js");

// @desc    Create a stripe payment intent
// @route   POST /api/transactions/create-payment-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  const { propertyId } = req.body;

  if (!propertyId) {
    return res.status(400).json({ message: "Property ID is required." });
  }

  try {
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found." });
    }

    // Crucial check: Ensure the property has a valid owner before proceeding
    if (!property.userId) {
      console.error(
        `Payment blocked: Property ${propertyId} is missing an owner (userId).`
      );
      return res.status(500).json({
        message: "Cannot process payment: Property data is corrupted.",
      });
    }

    // The price is fetched securely from the database, not from the client.
    const totalAmount = parseFloat(property.rent);

    const commissionRate = parseFloat(process.env.COMMISSION_RATE) || 0.05; // 5% default
    const commissionAmount = totalAmount * commissionRate;
    const netAmount = totalAmount - commissionAmount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Amount in cents
      currency: "usd",
      metadata: {
        propertyId: property._id.toString(),
        renterId: (req.user.id || req.user._id).toString(),
        landlordId: property.userId.toString(),
        commissionAmount: commissionAmount.toString(),
        netAmount: netAmount.toString(),
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in createPaymentIntent:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Verify payment and create a transaction record
// @route   POST /api/transactions/verify-payment
// @access  Private
const verifyPayment = async (req, res) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ message: "Payment Intent ID is required." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      const { propertyId, renterId, landlordId, commissionAmount, netAmount } =
        paymentIntent.metadata;

      // Security check: Verify amount server-side again to be absolutely sure
      const property = await Property.findById(propertyId);
      // Robust renter lookup
      let renter = await User.findById(renterId);
      if (!renter && req.user && req.user.email) {
        renter = await User.findOne({ email: req.user.email });
        if (renter) {
          console.warn(
            `Renter not found by ID (${renterId}), but found by email (${req.user.email}).`
          );
        }
      }
      // Robust landlord lookup
      const landlordIdRaw = landlordId;
      let landlord = await User.findById(landlordIdRaw);
      if (!landlord && property.ownerEmail) {
        landlord = await User.findOne({ email: property.ownerEmail });
        if (landlord) {
          console.warn(
            `Landlord not found by ID (${landlordIdRaw}), but found by email (${property.ownerEmail}).`
          );
        }
      }

      if (!renter || !landlord) {
        console.error(
          `Transaction creation failed: Renter or Landlord not found. Renter: ${renterId}, Landlord: ${landlordId}`
        );
        return res.status(404).json({ message: "User not found." });
      }

      if (!property || property.rent * 100 !== paymentIntent.amount) {
        return res
          .status(400)
          .json({ message: "Price mismatch. Payment verification failed." });
      }

      const existingTransaction = await Transaction.findOne({
        paymentIntentId,
      });
      if (existingTransaction) {
        return res
          .status(200)
          .json({ message: "Transaction already recorded." });
      }

      const newTransaction = new Transaction({
        property: propertyId,
        renter: renterId,
        landlord: landlordId,
        totalAmount: paymentIntent.amount / 100,
        commissionAmount: parseFloat(commissionAmount),
        netAmount: parseFloat(netAmount),
        paymentIntentId: paymentIntent.id,
        status: "succeeded",
      });

      await newTransaction.save();

      // Mark the property as rented so it cannot be rented again
      await Property.findByIdAndUpdate(propertyId, { isRented: true });

      // Send email notifications
      const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
      const dateStr = new Date().toLocaleString();
      const emailDetails = {
        propertyTitle: property.title,
        rent: property.rent,
        commission: commissionAmount,
        net: netAmount,
        date: dateStr,
        paymentId: paymentIntent.id,
      };
      // Email to renter
      sendEmail({
        to: renter.email,
        subject: "Payment Successful - Rent a Space",
        text: `You have successfully rented the property "${emailDetails.propertyTitle}" for $${emailDetails.rent}.\nCommission: $${emailDetails.commission}\nNet to Landlord: $${emailDetails.net}\nDate: ${emailDetails.date}\nPayment ID: ${emailDetails.paymentId}`,
      }).catch(console.error);
      // Email to landlord
      sendEmail({
        to: landlord.email,
        subject: "Your Property Has Been Rented - Rent a Space",
        text: `Your property "${emailDetails.propertyTitle}" has been rented for $${emailDetails.rent}.\nCommission: $${emailDetails.commission}\nNet to You: $${emailDetails.net}\nDate: ${emailDetails.date}\nPayment ID: ${emailDetails.paymentId}`,
      }).catch(console.error);
      // Email to admin
      sendEmail({
        to: adminEmail,
        subject: "New Rental Transaction - Rent a Space",
        text: `Property: "${emailDetails.propertyTitle}"\nRent: $${emailDetails.rent}\nCommission: $${emailDetails.commission}\nNet: $${emailDetails.net}\nDate: ${emailDetails.date}\nPayment ID: ${emailDetails.paymentId}\nRenter: ${renter.email}\nLandlord: ${landlord.email}`,
      }).catch(console.error);

      res
        .status(201)
        .json({ message: "Payment successful and transaction recorded." });
    } else {
      res.status(400).json({
        message: "Payment not successful.",
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all transactions for admin
// @route   GET /api/transactions/admin/all
// @access  Admin
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "succeeded" })
      .populate("property")
      .populate("renter", "name email")
      .populate("landlord", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error in getTransactions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  verifyPayment,
  getTransactions,
};
