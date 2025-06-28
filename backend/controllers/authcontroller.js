const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password, mobile });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();

    const jwtToken = jwt.sign(
      { email: userModel.email, _id: userModel._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Signup successful",
      success: true,
      jwtToken,
      email: userModel.email,
      name: userModel.name,
      phone: userModel.mobile,
    });
  } catch (err) {
    console.log("controller err", err);
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    console.log("user", user);

    res.status(200).json({
      message: "Login Success",
      success: true,
      jwtToken,
      email,
      name: user.name,
      mobile: user.mobile,
    });
  } catch (err) {
    console.log("controller err", err);
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
