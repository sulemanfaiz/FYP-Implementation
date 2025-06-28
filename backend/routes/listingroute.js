const multer = require("multer");

const {
  getListing,
  getListingDetail,
  editListing,
  getAllListings,
  markListingAsInactive,
  searchListings,
  detailedFilterListings,
  addListing,
} = require("../controllers/listingcontroller");

const { verifyToken, safeVerifyToken } = require("../middlewares/auth");

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
  addListing
);

router.put(
  "/edit-listing/:id",
  verifyToken,
  upload.array("images", 10),
  editListing
);

router.patch("/mark-as-inactive/:id", verifyToken, markListingAsInactive);

router.get("/get-user-listings", verifyToken, getListing);

router.get("/get-all-listings", safeVerifyToken, getAllListings);

router.get("/get-listing-detail/:id", safeVerifyToken, getListingDetail);

router.get("/search", safeVerifyToken, searchListings);

router.get("/filtered-search", safeVerifyToken, detailedFilterListings);

module.exports = router;
