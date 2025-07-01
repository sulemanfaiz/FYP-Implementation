const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken"); // Add this for token verification
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const AuthRouter = require("./routes/authroute");
const AdminRouter = require("./routes/adminroute");
const ListingRouter = require("./routes/listingroute");
const LikedListingRouter = require("./routes/likedlistingroute");
const PredictionRouter = require("./routes/predictionRoutes"); // adjust path & filename if needed

require("dotenv").config();
require("./models/db");
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Backend is running for KirayePe.com");
});

// API Routes
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  next();
});

app.use("/auth", AuthRouter);
app.use("/admin", AdminRouter);
app.use("/listing", ListingRouter);
app.use("/likedlisting", LikedListingRouter);
app.use("/api/predictions", PredictionRouter);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
