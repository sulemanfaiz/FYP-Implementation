const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51Rh4GqP8mAGbcY5dJPeFbr0zycIjxkP5qqw1HLvWqHTikhSMi5SSE8hsHiZ6qcl1gUCKsx6noZbOTwjNfrTIjR6v00O1bQk7D0");

// CORS for dev
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    return res.status(200).json({});
  }
  next();
});

// Create payment intent for property premium listing
router.post("/create-payment-intent", async (req, res) => {
  try {
    let { amount, currency } = req.body;
    amount = parseInt(amount, 10);
    if (!amount || amount < 50) return res.status(400).json({ error: "Invalid amount" });
    if (!currency) currency = "usd"; // fallback
    // For PKR, Stripe test mode: use 'usd', in production: 'pkr'
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
