const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid" });
      }

      req.user = user; //  Now req.user will be available
      next();
    });
  } else {
    res.status(401).json({ message: "Authentication token missing" });
  }
};

const safeVerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) return next();

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        next();
      }

      req.user = user; //  Now req.user will be available
      next();
    });
  } else {
    next();
  }
};

module.exports = { verifyToken, safeVerifyToken };
