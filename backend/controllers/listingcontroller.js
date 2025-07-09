const ListingModel = require("../models/listing");
const LikedListingModel = require("../models/likedlisting");

const UserModel = require("../models/user");
const sendEmail = require("../utils/Sendemail");
const mongoose = require("mongoose");
const PaymentModel = require("../models/payment");

const addListing = async (req, res) => {
  try {
    const userId = req.user._id;
    const imagePaths = req?.files?.map((file) => file?.path) || [];
    const imageFileNames = req.files?.map((file) => file?.filename) || [];

    const isDraft = req?.body?.isDraft === "true";

    // Optional JSON-parsed features
    let propertyFeatures = [];
    try {
      propertyFeatures = req.body.features ? JSON.parse(req.body.features) : [];
    } catch (e) {
      console.warn("Invalid features format", e);
    }

    const listingData = {
      propertyType: req.body.propertyType,
      city: req.body.city,
      areaSizeUnit: req.body.areaSizeUnit,
      areaSizeMetric: req.body.areaSizeMetric,
      rent: req.body.rent,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      title: req.body.title,
      adress: req.body.adress,
      garages: req.body.garages,

      houseNo: req.body.houseNo || "",
      yearBuilt: req.body.yearBuilt || "",
      desc: req.body.desc || "",

      paths: imagePaths,
      fileNames: imageFileNames,
      userId,

      comment: req.body.comment || "",
      reason: req.body.reason || "",

      userStatus: isDraft ? "DFT" : "PEN",
      adminStatus: isDraft ? "DFT" : "PEN",
      features: propertyFeatures,

      isDiscountEnabled: req.body.isDiscountEnabled === "true",
      discountStartDate: req.body.discountStartDate,
      discountEndDate: req.body.discountEndDate,
      discountPercentage: req.body.discountPercentage,
      discountLabel: req.body.discountLabel,
      isPremium: req.body.isPremium === 'true',
    };

    const listing = new ListingModel(listingData);
    await listing.save();
    const user = await UserModel.findById(userId); // ⬅ this fetches full user
    const name = user?.name || "Unknown User"; // fallback if missing
    const email = user?.email;
    const adminEmail = process.env.ADMIN_EMAIL;
    const propertyUrl = `http://localhost:3000/listing/${listing._id}`; // public view

    sendEmail({
      to: adminEmail,
      subject: ` New property awaiting approval`,
      html: `
    <p>Hi Admin,</p>
    <p>User <strong>${name}</strong> (${email}) has just added a property titled 
       "<em>${listing.title}</em>".</p>
   <p>Please review and take the necessary action in the admin dashboard.</p>
  <p>🔗 <a href="${propertyUrl}" target="_blank">View Property</a></p>
  `,
    }).catch(console.error); // log but don’t crash the request

    res
      .status(201)
      .json({ success: true, message: "Listing added successfully" });
  } catch (err) {
    console.error("add listing controller error", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const editListing = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Fetch existing listing
    const existingListing = await ListingModel.findById(id);

    if (!existingListing) {
      return res.status(404).json({
        message: "Listing not found",
        success: false,
      });
    }

    // Check if user owns this listing
    if (existingListing.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to edit this listing",
        success: false,
      });
    }

    const propertyFeatures = JSON.parse(req.body.features);

    // Handle images
    let updatedFileNames = existingListing.fileNames || [];
    let updatedPaths = existingListing.paths || [];

    if (req.files && req.files.length > 0) {
      const newFileNames = req.files.map((file) => file.filename);
      const newPaths = req.files.map((file) => file.path);
      updatedFileNames = [...updatedFileNames, ...newFileNames];
      updatedPaths = [...updatedPaths, ...newPaths];
    }

    const { status: _ignorerStatus, ...restBody } = req.body;

    // Update listing in DB
    const updatedListing = await ListingModel.findByIdAndUpdate(
      id,
      {
        ...restBody,
        fileNames: updatedFileNames,
        paths: updatedPaths,
        features: propertyFeatures,
        userStatus: "PEN",
        adminStatus: "PEN",
      },
      { new: true }
    );

    // 🔔 Send Email to Admin
    const user = await UserModel.findById(userId);
    const name = user?.name || "Unknown User";
    const email = user?.email;
    const adminEmail = process.env.ADMIN_EMAIL;

    const propertyUrl = `http://localhost:3000/listing/${id}`; // or /admin/review-listings/${id}

    sendEmail({
      to: adminEmail,
      subject: `Listing Edited: Please Review Again`,
      html: `
        <p>Hi Admin,</p>
        <p>User <strong>${name}</strong> (${email}) has <strong>edited</strong> a listing titled "<em>${updatedListing?.title}</em>".</p>
        <p>Please review the updated property.</p>
        <p>🔗 <a href="${propertyUrl}" target="_blank">View Edited Property</a></p>
      `,
    }).catch(console.error);

    res.status(200).json({
      message: "Listing updated successfully",
      success: true,
    });
  } catch (err) {
    console.log("edit listing controller error", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const getListing = async (req, res) => {
  try {
    const userId = req.user._id; // get user id from token

    const listings = await ListingModel.find({
      userId,
    });

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    console.error("Error fetching user listings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllListings = async (req, res) => {
  try {
    // Only find listings that are not rented
    const listings = await ListingModel.find({ isRented: { $ne: true }, adminStatus: "APR" });

    let likedListingIds = [];

    // If user is logged in, get liked listings
    if (req.user) {
      const userId = req.user._id;
      const liked = await LikedListingModel.find({ userId });
      likedListingIds = liked.map((like) => like.listingId.toString());
    }

    const listingsWithLikeFlag = listings.map((listing) => ({
      ...listing.toObject(),
      isLiked: likedListingIds.includes(listing._id.toString()),
    }));

    // Single response - remove the 'return' and make sure this is the only response
    res.status(200).json({
      success: true,
      listings: listingsWithLikeFlag,
    });
  } catch (error) {
    console.error("Error fetching all listings:", error);

    // Make sure we haven't already sent a response
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

const unlockWhatsApp = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Check if a payment record already exists for this specific feature
    const existingPayment = await PaymentModel.findOne({ userId, listingId: id, featureType: "unlock_whatsapp" });
    if (existingPayment) {
      return res.status(400).json({ success: false, message: "Payment already made" });
    }

    const payment = new PaymentModel({
      featureType: "unlock_whatsapp",
      userId,
      listingId: id,
      amount: 2, // Set the amount to $2
      currency: "USD",
      status: "succeeded",
    });

    await payment.save();

    res.status(201).json({ success: true, message: "WhatsApp feature unlocked successfully" });
  } catch (error) {
    console.error("Error unlocking WhatsApp feature:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getListingDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`
--- Debugging Access for Listing: ${id} ---`);

    const listing = await ListingModel.findById(id);
    if (!listing) {
      console.log('[DEBUG] Listing not found in database.');
      return res.status(404).json({ message: "Listing not found", success: false });
    }

    if (!listing.userId) {
      return res.status(500).json({ success: false, message: 'Property data is corrupted; owner is missing.' });
    }
    const owner = await UserModel.findById(listing.userId);
    const responseData = {
      ...listing.toObject(),
      ownerName: owner?.name,
      ownerEmail: owner?.email,
    };

    const loggedInUserId = req?.user?._id;
    console.log(`[DEBUG] Listing Owner ID: ${listing.userId?.toString()}`);
    console.log(`[DEBUG] Logged-in User ID: ${loggedInUserId?.toString()}`);

    let hasPaid = false;
    let isOwner = false;

    if (loggedInUserId) {
      if (listing.userId && listing.userId.toString() === loggedInUserId.toString()) {
        isOwner = true;
      }
      console.log(`[DEBUG] Is user the owner? ${isOwner}`);

      const payment = await PaymentModel.findOne({
        userId: loggedInUserId,
        listingId: id,
        featureType: "unlock_whatsapp",
      });

      if (payment) {
        hasPaid = true;
      }
      console.log(`[DEBUG] Has user paid? ${hasPaid} (Payment record: ${payment ? 'Found' : 'Not Found'})`);

    } else {
      console.log('[DEBUG] No user is logged in for this request.');
    }

    if (isOwner || hasPaid) {
      console.log('[DEBUG] Access GRANTED. Adding phone number to response.');
      responseData.ownerPhone = owner?.phone;
    }

    responseData.hasPaidForWhatsApp = isOwner || hasPaid;
    console.log(`[DEBUG] Final 'hasPaidForWhatsApp' flag: ${responseData.hasPaidForWhatsApp}`);
    console.log('--- End of Debug ---');

    res.status(200).json({
      success: true,
      data: responseData,
    });

  } catch (error) {
    console.error("Error fetching listing details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const markListingAsInactive = async (req, res) => {
  try {
    const { id } = req.params; // assuming you send listing id in the URL
    const { comment = "", reason = "" } = req.body || {}; // comment from request body

    const updatedListing = await ListingModel.findByIdAndUpdate(
      id,
      {
        status: "INA",
        userComment: comment || "", // if comment is missing, default to empty string
        userReason: reason || "", // if reason is missing, default to empty string
      },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Listing marked as inactive",
      listing: updatedListing,
    });
  } catch (error) {
    console.error("Error setting listing as inactive:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const searchListings = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res
      .status(400)
      .json({ success: false, message: "Search query is required" });
  }

  try {
    const words = query.split(" ")?.filter((word) => word?.trim() !== "");

    // Create regex-based $or condition for each word
    const orConditions = words?.flatMap((word) => {
      const regex = new RegExp(word, "i");

      return [
        { city: regex },
        { adress: regex },
        { title: regex },
        { desc: regex },
      ];
    });

    // Find listings where any word matches any of the fields, and the property is not rented
    const listings = await ListingModel.find({ $and: [{ $or: orConditions }, { isRented: { $ne: true } }] });

    res.status(200).json({ success: true, listings });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const detailedFilterListings = async (req, res) => {
  try {
    const {
      q,
      propertyType,
      bedroomCount,
      bathroomCount,
      plotSizeMin,
      plotSizeMax,
      plotSizeUnit,
    } = req.query;

    const filter = {
      adminStatus: "APR",
      isRented: { $ne: true }, // Exclude rented properties
    };

    if (q) {
      const words = q.split(" ").filter((word) => word.trim() !== "");
      const regexFilters = words.flatMap((word) => {
        const regex = new RegExp(word, "i");
        return [
          { city: regex },
          { adress: regex },
          { title: regex },
          { desc: regex },
        ];
      });

      filter.$or = regexFilters; // OR match on any field for any word
    }

    if (propertyType) {
      filter.propertyType = propertyType;
    }

    if (bedroomCount) {
      filter.bedrooms = parseInt(bedroomCount);
    }

    if (bathroomCount) {
      filter.bathrooms = parseInt(bathroomCount);
    }

    if (plotSizeMin || plotSizeMax) {
      filter.areaSizeUnit = {};
      if (plotSizeMin) filter.areaSizeUnit.$gte = parseFloat(plotSizeMin);
      if (plotSizeMax) filter.areaSizeUnit.$lte = parseFloat(plotSizeMax);
    }

    if (plotSizeUnit) {
      filter.areaSizeMetric = plotSizeUnit.toLowerCase(); // normalize casing
    }

    const listings = await ListingModel.find(filter);

    res.status(200).json({ success: true, listings });
  } catch (error) {
    console.error("Filter search error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const featureProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // 1. Check if the listing exists and belongs to the user
    const listing = await ListingModel.findOne({ _id: id, userId });
    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found or you're not the owner." });
    }

    // 2. Check if the property is already featured to prevent duplicate payments
    if (listing.isPremium) {
      return res.status(400).json({ success: false, message: "This property is already featured." });
    }

    // 3. Create the payment record
    const payment = new PaymentModel({
      featureType: "feature_property",
      userId,
      listingId: id,
      amount: 5, // $5 to feature
      currency: "USD",
      status: "succeeded",
    });
    await payment.save();

    // 4. Update the listing to mark it as premium
    listing.isPremium = true;
    await listing.save();

    res.status(200).json({ success: true, message: "Property featured successfully!" });

  } catch (error) {
    console.error("Error featuring property:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  addListing,
  editListing,
  getListing,
  getListingDetail,
  getAllListings,
  markListingAsInactive,
  searchListings,
  detailedFilterListings,
  unlockWhatsApp,
  featureProperty,
};
