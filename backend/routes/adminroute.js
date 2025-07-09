const {
  adminLogin,
  getAllSubmittedListings,
  approveListing,
  rejectListing,
} = require("../controllers/admincontroller");
const { verifyToken } = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/isAdmin");
const { loginValidation } = require("../middlewares/authvalidation");

const router = require("express").Router();

router.post("/admin-login", loginValidation, adminLogin);

router.get(
  "/get-review-listings",
  verifyToken,
  isAdmin,
  getAllSubmittedListings
);
router.patch("/approve-listing/:id", verifyToken, isAdmin, approveListing);
router.patch("/reject-listing/:id", verifyToken, isAdmin, rejectListing);

module.exports = router;
