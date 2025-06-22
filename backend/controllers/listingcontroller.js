const ListingModel = require("../models/listing");
const LikedListingModel = require("../models/likedlisting");

const addlisting = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
    const imageFileNames = req.files.map((file) => file.filename);
    const userId = req.user._id;

    const isDraft = req.body.isDraft === "true" ? true : false;

    const propertyFeatures = JSON.parse(req.body.features);

    const listingData = {
      ...req.body,
      fileNames: imageFileNames, // Save file path in DB
      paths: imagePaths, // Save file path in DB
      userId: userId,
      status: isDraft ? "DFT" : "ACT",
      features: propertyFeatures,
    };

    const listingModel = new ListingModel(listingData);

    await listingModel.save();
    res.status(201).json({
      message: "Listing added successfully",
      success: true,
    });
  } catch (err) {
    console.log("add listing controller error", err);
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
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

    // Optional: Check if logged-in user owns this listing
    if (existingListing.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to edit this listing",
        success: false,
      });
    }

    const propertyFeatures = JSON.parse(req.body.features);

    // Handle new images if uploaded
    let updatedFileNames = existingListing.fileNames || [];
    let updatedPaths = existingListing.paths || [];

    if (req.files && req.files.length > 0) {
      const newFileNames = req.files.map((file) => file.filename);
      const newPaths = req.files.map((file) => file.path);
      updatedFileNames = [...updatedFileNames, ...newFileNames];
      updatedPaths = [...updatedPaths, ...newPaths];
    }

    // Now update listing
    await ListingModel.findByIdAndUpdate(id, {
      ...req.body,
      fileNames: updatedFileNames,
      paths: updatedPaths,
      features: propertyFeatures,
    });

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

    const listings = await ListingModel.find({ userId });
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
    const listings = await ListingModel.find(); // no filter, get everything

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

    return res.status(200).json({
      success: true,
      listings: listingsWithLikeFlag,
    });
  } catch (error) {
    console.error("Error fetching all listings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getListingDetail = async (req, res) => {
  try {
    const listingId = req.params.id;

    const listing = await ListingModel.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Listing fetched successfully",
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("Error fetching user listings:", error);
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
        comment: comment || "", // if comment is missing, default to empty string
        reason: reason || "", // if reason is missing, default to empty string
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

module.exports = {
  addlisting,
  editListing,
  getListing,
  getListingDetail,
  getAllListings,
  markListingAsInactive,
};
