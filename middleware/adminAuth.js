const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.admin_token;

  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
