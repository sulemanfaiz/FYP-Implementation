const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  propertyType: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  areaSizeUnit: {
    type: String,
    // required: true,
  },
  areaSizeMetric: {
    type: String,
    // required: true,
  },

  rent: {
    type: String,
    // required: true,
  },
  bedrooms: {
    type: String,
    // required: true,
  },
  bathrooms: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },

  desc: {
    type: String,
    // required: false,
  },

  houseNo: {
    type: String,
    // required: false,
  },

  adress: {
    type: String,
    // required: false,
  },

  garages: {
    type: String,
    // required: false,
  },

  yearBuilt: {
    type: String,
    // required: false,
  },

  status: {
    type: String,
    // required: false,
  },

  paths: [
    {
      type: String,
      // required: false,
    },
  ],

  fileNames: [
    {
      type: String,
      // required: false,
    },
  ],

  userId: {
    type: String,
    // required: true,
  },

  isDraft: {
    type: String,
    // required: true,
  },

  comment: {
    type: String,
    // required: false,
  },

  reason: {
    type: String,
    // required: false,
  },

  features: [
    {
      key: { type: String },
      label: { type: String },
      count: { type: Number, default: 0 },
    },
  ],

  isDiscountEnabled: {
    type: String,
    // required: false,
  },

  discountStartDate: {
    type: String,
    // required: false,
  },
  discountEndDate: {
    type: String,
    // required: false,
  },
  discountPercentage: {
    type: String,
    // required: false,
  },
  discountLabel: {
    type: String,
    // required: false,
  },
});

const ListingModel = mongoose.model("listings", ListingSchema);
module.exports = ListingModel;
