const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likedListingSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  listingId: {
    type: String,
    ref: "Listing",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LikedListingModel = mongoose.model("likedlisting", likedListingSchema);
mongoose.model("LikedListing", likedListingSchema); // Register as 'LikedListing' for population compatibility
module.exports = LikedListingModel;
