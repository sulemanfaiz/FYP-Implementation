const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  featureType: { type: String, required: true },
  userId: { type: String, required: true },
  listingId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "USD" },
  status: { type: String, default: "succeeded" },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const PaymentModel = mongoose.model("payments", PaymentSchema);
mongoose.model("Payment", PaymentSchema); // Register as 'Payment' for population compatibility
module.exports = PaymentModel;
