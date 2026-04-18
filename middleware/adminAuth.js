const jwt = require("jsonwebtoken");

module.exports = function adminAuth(req, res, next) {
  let token = null;

  // ✅ 1. Try cookie first (existing behavior)
  if (req.cookies?.admin_token) {
    token = req.cookies.admin_token;
  }

  // ✅ 2. Fallback: Authorization header (for iPhone issues)
  if (!token && req.headers.authorization) {
    const bearer = req.headers.authorization.split(" ");
    if (bearer[0] === "Bearer") {
      token = bearer[1];
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "Admin token missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};