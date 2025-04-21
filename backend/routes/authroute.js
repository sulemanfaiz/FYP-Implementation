const { signup, login } = require("../controllers/authcontroller");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authvalidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
