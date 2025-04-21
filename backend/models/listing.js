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
});

const ListingModel = mongoose.model("listings", ListingSchema);
module.exports = ListingModel;
