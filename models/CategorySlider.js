const mongoose = require("mongoose");

const CategoryItemSchema = new mongoose.Schema({
  title: String,
  slug: String,   // 👈 ADD THIS
  tag: String,
  image: String,
  order: Number,
});

const CategorySliderSchema = new mongoose.Schema(
  {
    heading: String,
    description: String,
    items: [CategoryItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategorySlider", CategorySliderSchema);
