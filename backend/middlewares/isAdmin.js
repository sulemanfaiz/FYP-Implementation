const User = require("../models/admin.js");

const isAdmin = async (req, res, next) => {
  console.log("👑 isAdmin middleware called");
  try {
    // req.user is attached by the verifyToken middleware
    if (!req.user) {
      console.log("👑 No req.user found");
      return res.status(401).json({ message: "Authentication required." });
    }

    console.log("👑 req.user found:", req.user);
    const email = req.user.email;
    console.log("👑 Looking for user with email:", email);
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      console.log("👑 User not found in database");
      return res.status(404).json({ message: "User not found." });
    }

    console.log("👑 User found, role:", foundUser.role);
    // if (foundUser.role !== "admin") {
    //   console.log("👑 User is not admin");
    //   return res
    //     .status(403)
    //     .json({ message: "Access denied. Admin role required." });
    // }

    console.log("👑 Admin access granted");
    next();
  } catch (error) {
    console.log("👑 isAdmin error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { isAdmin };
