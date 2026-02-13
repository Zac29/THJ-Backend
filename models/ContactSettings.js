const mongoose = require("mongoose");

const contactSettingsSchema = new mongoose.Schema(
  {
    phone: String,
    email: String,
    locationText: String,
    mapEmbedUrl: String,
    inquiryTypes: {
      type: [String],
      default: [
        "Tibetan Jewellery",
        "Traditional Handicrafts",
        "Wholesale & Archive",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactSettings", contactSettingsSchema);
