const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({ success: true });
};

exports.verifyAdmin = (req, res) => {
  res.json({ ok: true });
};
