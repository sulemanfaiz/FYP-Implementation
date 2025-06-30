const {
  adminLogin,
  getAllSubmittedListings,
  approveListing,
  rejectListing,
} = require("../controllers/admincontroller");
const { verifyToken } = require("../middlewares/auth");
const { loginValidation } = require("../middlewares/authvalidation");

const router = require("express").Router();

router.post("/admin-login", loginValidation, adminLogin);

router.get("/get-review-listings", loginValidation, getAllSubmittedListings);
router.patch("/approve-listing/:id", verifyToken, approveListing);
router.patch("/reject-listing/:id", verifyToken, rejectListing);

module.exports = router;
