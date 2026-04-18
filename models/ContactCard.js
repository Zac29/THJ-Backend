const mongoose = require("mongoose");

const ContactCardSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    locationText: { type: String, required: true },

    whatsappEnabled: { type: Boolean, default: true },
    emailEnabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactCard", ContactCardSchema);
