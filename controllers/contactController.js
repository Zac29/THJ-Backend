const Inquiry = require("../models/Inquiry");
const ContactSettings = require("../models/ContactSettings");
const nodemailer = require("nodemailer");

/* ================= SETTINGS ================= */

exports.getSettings = async (req, res) => {
  let data = await ContactSettings.findOne();

  if (!data) {
    data = await ContactSettings.create({
      phone: "+91 98765 43210",
      email: "studio@tibetanarts.com",
      locationText: "Bodh Gaya, India",
      mapEmbedUrl: "",
    });
  }

  res.json(data);
};

exports.updateSettings = async (req, res) => {
  await ContactSettings.findOneAndUpdate({}, req.body, { upsert: true });
  res.json({ success: true });
};

/* ================= INQUIRIES ================= */

exports.submitInquiry = async (req, res) => {
  await Inquiry.create(req.body);
  res.json({ success: true });
};

exports.getInquiries = async (req, res) => {
  const data = await Inquiry.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.replyInquiry = async (req, res) => {
  const { id, reply } = req.body;
  const inquiry = await Inquiry.findById(id);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.ADMIN_EMAIL,
    to: inquiry.email,
    subject: "Reply from Studio",
    text: reply,
  });

  inquiry.replied = true;
  await inquiry.save();

  res.json({ success: true });
};
