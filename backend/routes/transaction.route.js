const express = require("express");
const {
  createPaymentIntent,
  verifyPayment,
  getTransactions,
} = require("../controllers/transaction.controller");
const { verifyToken } = require("../middlewares/auth.js");
const { isAdmin } = require("../middlewares/isAdmin.js");
const bcrypt = require("bcrypt");

const router = express.Router();

// Debug middleware to log all requests to transaction routes
router.use((req, res, next) => {
  console.log(`🔍 Transaction route hit: ${req.method} ${req.path}`);
  next();
});

// @route   POST /api/transactions/create-payment-intent
// @desc    Create a Stripe payment intent
// @access  Private (Authenticated Users)
router.post("/create-payment-intent", verifyToken, createPaymentIntent);

// @route   POST /api/transactions/verify-payment
// @desc    Verify the payment and create a transaction record
// @access  Private (Authenticated Users)
router.post("/verify-payment", verifyToken, verifyPayment);

// @route   GET /api/transactions/admin/all
// @desc    Get all transactions for the admin audit page
// @access  Admin
router.get("/admin/all", verifyToken, isAdmin, getTransactions);

// Simple test route to bypass middleware complexity
router.get("/admin/test", (req, res) => {
  console.log("🔍 Admin test route hit");
  res.json({ message: "Admin test route working", user: req.user });
});

// Debug route to list all users
router.get("/debug/users", async (req, res) => {
  try {
    const User = require("../models/user.js");
    const users = await User.find({}, "name email role _id");
    console.log("🔍 All users in database:", users);
    res.json({ users });
  } catch (error) {
    console.error("🔍 Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});

// Temporary route to make a user admin (for testing)
router.get("/debug/make-admin/:email", async (req, res) => {
  try {
    const User = require("../models/user.js");
    const { email } = req.params;
    const user = await User.findOneAndUpdate(
      { email },
      { role: "admin" },
      { new: true }
    );
    if (user) {
      console.log("🔍 Made user admin:", user);
      res.json({ message: "User made admin successfully", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("🔍 Error making user admin:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to check current admin users
router.get("/debug/admin-users", async (req, res) => {
  try {
    const User = require("../models/user.js");
    const adminUsers = await User.find(
      { role: "admin" },
      "name email role _id"
    );
    console.log("🔍 Admin users in database:", adminUsers);
    res.json({ adminUsers });
  } catch (error) {
    console.error("🔍 Error fetching admin users:", error);
    res.status(500).json({ error: error.message });
  }
});

// Temporary route to create a new admin user
router.get("/debug/create-admin", async (req, res) => {
  try {
    const User = require("../models/user.js");
    const email = "Admin1234@gmail.com";
    const password = "Admin1234";
    const name = "Admin";
    let user = await User.findOne({ email });
    if (user) {
      user.role = "admin";
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      return res.json({
        message: "Admin user already existed, role and password updated",
        user,
      });
    }
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: "admin",
      mobile: "0000000000",
    });
    await user.save();
    res.json({ message: "Admin user created successfully", user });
  } catch (error) {
    console.error("🔍 Error creating admin user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Debug route to create a specific admin user for testing isAdmin
router.get("/debug/create-specific-admin", async (req, res) => {
  try {
    const User = require("../models/user.js");
    const mongoose = require("mongoose");
    const _id = new mongoose.Types.ObjectId("686106fa131e68bffa7bfef0");
    const email = "admin@gmail.com";
    const password = "admin@gmail.com";
    const name = "Admin";
    let user = await User.findOne({ email });
    if (user) {
      user.role = "admin";
      user.password = await bcrypt.hash(password, 10);
      user._id = _id; // force the _id if needed
      await user.save();
      return res.json({
        message: "Admin user already existed, role, password, and _id updated",
        user,
      });
    }
    user = new User({
      _id,
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role: "admin",
      mobile: "0000000000",
    });
    await user.save();
    res.json({ message: "Admin user created successfully", user });
  } catch (error) {
    console.error("🔍 Error creating specific admin user:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
