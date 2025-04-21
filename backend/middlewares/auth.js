const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }

      console.log("verifyToken user", user);
      req.user = user; //  Now req.user will be available
      next();
    });
  } else {
    res.status(401).json({ message: "Authentication token missing" });
  }
};

module.exports = verifyToken;
