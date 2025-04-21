const ListingModel = require("../models/listing");

const addlisting = async (req, res) => {
  try {
    const imagePaths = req.files.map((file) => file.path);
    const imageFileNames = req.files.map((file) => file.filename);
    const userId = req.user._id;

    const listingData = {
      ...req.body,
      fileNames: imageFileNames, // Save file path in DB
      paths: imagePaths, // Save file path in DB
      userId: userId,
      status: "active",
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

module.exports = {
  addlisting,
  getListing,
  getListingDetail,
};
