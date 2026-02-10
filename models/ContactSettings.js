const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema({
  phone: String,
  email: String,
  locationText: String,
  mapEmbedUrl: String,

  bannerTitle: String,
  bannerSubtitle: String,

  inquiryTypes: [String], // dropdown options

}, { timestamps: true });

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
