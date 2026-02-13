const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    type: String,
    message: String,
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);
