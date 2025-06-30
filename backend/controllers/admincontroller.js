const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin");
const ListingModel = require("../models/listing");
const UserModel = require("../models/user"); // ✅ Make sure path is correct
const sendEmail = require("../utils/Sendemail");
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AdminModel.findOne({ email });

    const errorMsg = "Auth failed email or password is wrong";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: "Admin",
    });
  } catch (err) {
    console.log("controller err", err);
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const getAllSubmittedListings = async (req, res) => {
  try {
    // Fetch all listings except drafts (assuming "DFT" = Draft)
    const listings = await ListingModel.find({ userStatus: { $ne: "DFT" } });

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    console.error("Admin listing fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
    });
  }
};

const approveListing = async (req, res) => {
  const listingId = req.params.id;
  console.log("BODY:", req.body);
  const { adminMessage } = req.body || {}; // admin's custom description // admin's custom description

  try {
    const listing = await ListingModel.findByIdAndUpdate(
      listingId,
      {
        adminStatus: "APR",
        reviewedAt: new Date(),
        adminMessage,
      },
      { new: true }
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Get the user who uploaded the property
    const user = await UserModel.findById(listing.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for this listing",
      });
    }

    // ─────────────────────────────────────────
    // ✉  Build a plain‑HTML approval email
    // ─────────────────────────────────────────
    const emailSubject = `🎉 Your property "${listing.title}" has been approved!`;

    const emailHtml = `
      <div>
        <h1>✅ Property Approved!</h1>

        <p>Hi <strong>${user.name}</strong>,</p>

        <p>
          Great news! Your property listing has been <strong>approved</strong>
          and is now live on our platform.
        </p>

        <h3>Property Details:</h3>
        <ul>
          <li><strong>Title:</strong> ${listing.title}</li>
          <li><strong>Status:</strong> Approved</li>
          <li><strong>Approved on:</strong> ${new Date().toLocaleDateString()}</li>
        </ul>

        ${
          adminMessage
            ? `
              <h4>Message from Admin:</h4>
              <p>${adminMessage}</p>
            `
            : ""
        }

        <p>
          🎉 <strong>Congratulations!</strong> Your property is now live and
          visible to potential buyers or renters. You can expect to start
          receiving inquiries soon.
        </p>

        <p>Thank you for choosing our platform to list your property!</p>

        <p>Best regards,<br/>The Admin Team</p>
      </div>
    `;

    // Send the email (now includes the sender address)
    await sendEmail({
      from: `Rent‑A‑Space Admin <${process.env.ADMIN_EMAIL}>`,
      to: user.email,
      subject: emailSubject,
      html: emailHtml,
      // cc: process.env.ADMIN_EMAIL   // ← Uncomment if you want a copy
    }).catch(console.error);

    return res.status(200).json({
      success: true,
      message: "Listing approved successfully and user has been notified",
      data: listing,
      notification: {
        type: "success",
        title: "Property Approved",
        description:
          "The property has been approved and the user has been notified via email.",
      },
    });
  } catch (error) {
    console.error("Error approving listing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      notification: {
        type: "error",
        title: "Approval Failed",
        description: "There was an error approving the property.",
      },
    });
  }
};

const rejectListing = async (req, res) => {
  const listingId = req.params.id;
  const { reasonToReject = "" } = req.body || {};

  try {
    const listing = await ListingModel.findByIdAndUpdate(
      listingId,
      {
        adminStatus: "REJ",
        reviewedAt: new Date(),
        adminComment: reasonToReject,
      },
      { new: true }
    );

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    // Get the user who uploaded the property
    const user = await UserModel.findById(listing.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found for this listing",
      });
    }

    // ─────────────────────────────────────
    // ✉  Rejection email (plain HTML)
    // ─────────────────────────────────────
    const emailSubject = ` Your property ${listing.title} submission update`;

    const emailHtml = `
      <p>Hi ${user.name},</p>

      <p>Your property listing "<strong>${
        listing.title
      }</strong>" has been <strong>rejected</strong>.</p>

      <p><strong>Property Details:</strong></p>
      <ul>
        <li>Title: ${listing.title}</li>
        <li>Status: Rejected</li>
        <li>Reviewed on: ${new Date().toLocaleDateString()}</li>
      </ul>

      ${
        reasonToReject
          ? `
          <p><strong>Reason for rejection:</strong></p>
          <p>${reasonToReject}</p>
        `
          : ""
      }

      <p>You can make the necessary changes and resubmit your property for review.</p>

      <p>Thank you for using our platform.</p>

      <p>Best regards,<br/>The Admin Team</p>
    `;

    // Send email (now explicitly sets the sender)
    await sendEmail({
      from: `Rent‑A‑Space Admin <${process.env.ADMIN_EMAIL}>`,
      to: user.email,
      subject: emailSubject,
      html: emailHtml,
      // cc: process.env.ADMIN_EMAIL        // ← Uncomment if you want a copy
    }).catch(console.error);

    return res.status(200).json({
      success: true,
      message: "Listing rejected successfully and user has been notified",
      data: listing,
      notification: {
        type: "success",
        title: "Property Rejected",
        description:
          "The property has been rejected and the user has been notified via email.",
      },
    });
  } catch (error) {
    console.error("Error rejecting listing:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      notification: {
        type: "error",
        title: "Rejection Failed",
        description: "There was an error rejecting the property.",
      },
    });
  }
};

module.exports = {
  adminLogin,
  getAllSubmittedListings,
  approveListing,
  rejectListing,
};
