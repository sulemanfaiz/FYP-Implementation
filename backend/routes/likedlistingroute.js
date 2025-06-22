const {
  toggleLikeListing,
  getAllLikedListingOfUser,
} = require("../controllers/likedlistingcontroller");
const { verifyToken } = require("../middlewares/auth");

const router = require("express").Router();

router.post("/like-or-unlike", verifyToken, toggleLikeListing);
router.get("/get-user-liked-listings", verifyToken, getAllLikedListingOfUser);

module.exports = router;
