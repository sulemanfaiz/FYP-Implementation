const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  console.log("🔐 verifyToken middleware called for:", req.method, req.path);
  const authHeader = req.headers.authorization;
  console.log("🔐 Auth header:", authHeader ? "Present" : "Missing");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("🔐 Token extracted:", token ? "Yes" : "No");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("🔐 JWT verification failed:", err.message);
        return res.status(403).json({ message: "Token is invalid" });
      }

      console.log("🔐 JWT verification successful, user:", user);
      req.user = user; //  Now req.user will be available
      next();
    });
  } else {
    console.log("🔐 No auth header found");
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
        return next();
      }

      req.user = user; //  Now req.user will be available
      next();
    });
  } else {
    next();
  }
};

module.exports = { verifyToken, safeVerifyToken };
