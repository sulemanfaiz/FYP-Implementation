const LikedListingModel = require("../models/likedlisting");
const ListingModel = require("../models/listing");

const toggleLikeListing = async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user._id;
  try {
    const existing = await LikedListingModel.findOne({ userId, listingId });

    if (existing) {
      await LikedListingModel.deleteOne({ userId, listingId });
      return res
        .status(200)
        .json({ message: "Listing unliked", liked: false, success: true });
    } else {
      const newLike = new LikedListingModel({ userId, listingId });
      await newLike.save();
      return res
        .status(201)
        .json({ message: "Listing liked", liked: true, success: true });
    }
  } catch (error) {
    consoel.log("error", error);
    return res.status(500).json({ message: "Failed to toggle like", error });
  }
};

const getAllLikedListingOfUser = async (req, res) => {
  try {
    const userId = req.user._id;

    // Step 1: Get all liked listing IDs for the user
    const likedListings = await LikedListingModel.find({ userId }).select(
      "listingId"
    );

    console.log({ likedListings, userId });

    const listingIds = likedListings.map((like) => like.listingId);

    // Step 2: Fetch full listing documents from ListingModel
    const listings = await ListingModel.find({ _id: { $in: listingIds } });

    return res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    console.error("Error fetching liked listings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  toggleLikeListing,
  getAllLikedListingOfUser,
};
