const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  label: String,
  url: String,
});

const FooterSchema = new mongoose.Schema({
  brandText: String,

  socials: {
    instagram: String,
    pinterest: String,
    twitter: String,
  },

  quickLinks: [LinkSchema],
  helpLinks: [LinkSchema],

  newsletterText: String,

  companyName: String,
});

module.exports = mongoose.model("Footer", FooterSchema);
