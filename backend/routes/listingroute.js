const multer = require("multer");

const {
  addlisting,
  getListing,
  getListingDetail,
  editListing,
  getAllListings,
  markListingAsInactive,
} = require("../controllers/listingcontroller");
const verifyToken = require("../middlewares/auth");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add-listing",
  verifyToken,
  upload.array("images", 10),
  addlisting
);

router.put(
  "/edit-listing/:id",
  verifyToken,
  upload.array("images", 10),
  editListing
);

router.patch("/mark-as-inactive/:id", verifyToken, markListingAsInactive);

router.get("/get-user-listings", verifyToken, getListing);

router.get("/get-all-listings", verifyToken, getAllListings);

router.get("/get-listing-detail/:id", verifyToken, getListingDetail);

module.exports = router;
