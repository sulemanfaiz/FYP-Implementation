const express = require("express");
const { predictRent } = require("../controllers/predictionController");
const router = express.Router();

// POST /api/predictions/predict
router.post("/predict", predictRent);

module.exports = router;
