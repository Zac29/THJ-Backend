const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  banner: Object,
  intro: Object,
  images: Object,
  experience: Object,
  philosophy: Object,
});

module.exports = mongoose.model("AboutPage", AboutSchema);
