const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  propertyType: { type: String, required: true },
  city: { type: String, required: true },
  areaSizeUnit: { type: String, required: true },
  areaSizeMetric: { type: String, required: true },
  rent: { type: String, required: true },
  bedrooms: { type: String, required: true },
  bathrooms: { type: String, required: true },
  title: { type: String, required: true },
  adress: { type: String, required: true },
  garages: { type: String, required: true },
  yearBuilt: { type: String },
  houseNo: { type: String },
  desc: { type: String },
  paths: [{ type: String }],
  fileNames: [{ type: String }],
  userId: {
    type: String,
    // ref: "User",
    required: true,
  },
  // type: mongoose.Schema.Types.ObjectId,
  // ref: "users",
  // required: true,

  userComment: { type: String },
  userReason: { type: String },
  adminComment: { type: String },
  userStatus: { type: String, default: "PEN" }, // ACT, INA, DFT, etc.
  adminStatus: { type: String, default: "PEN" }, // ACT, INA, DFT, etc.
  features: [
    {
      key: { type: String },
      label: { type: String },
      count: { type: Number, default: 0 },
    },
  ],
  isDiscountEnabled: { type: Boolean },
  discountStartDate: { type: String },
  discountEndDate: { type: String },
  discountPercentage: { type: String },
  discountLabel: { type: String },
});

const ListingModel = mongoose.model("listings", ListingSchema);
module.exports = ListingModel;
