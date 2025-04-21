const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.urlencoded({ extended: true })); // This is important for handling FormData
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const AuthRouter = require("./routes/authroute");
const ListingRouter = require("./routes/listingroute");

require("dotenv").config();
require("./models/db");
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Backend is running for KirayePe.com");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/listing", ListingRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
