const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  image: String, // cloudinary url
  tag: String,
  title: String,
  description: String,
  buttonText: String,
  buttonLink: String,
  order: Number,
  align: { type: String, default: "right" }, // Added this
});

const StyleSchema = new mongoose.Schema({
  fontFamily: { type: String, default: "Poppins" },
  cardBg: { type: String, default: "bg-white/70" },
  titleColor: { type: String, default: "#2E2E2E" },
  descColor: { type: String, default: "#444" },
  tagColor: { type: String, default: "#8A6B2F" },
  buttonBg: { type: String, default: "#2E2E2E" },
});

const HeroSchema = new mongoose.Schema(
  {
    slides: [SlideSchema],
    style: StyleSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", HeroSchema);
