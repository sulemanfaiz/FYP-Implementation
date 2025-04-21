const multer = require("multer");

const {
  addlisting,
  getListing,
  getListingDetail,
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

router.get("/get-listings", verifyToken, getListing);

router.get("/get-listing-detail/:id", verifyToken, getListingDetail);

module.exports = router;
