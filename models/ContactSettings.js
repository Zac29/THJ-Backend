const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema({
  phone: String,
  email: String,
  locationText: String,
  mapEmbedUrl: String,
});

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
