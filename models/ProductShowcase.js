const mongoose = require("mongoose");

const SliderItemSchema = new mongoose.Schema({
  id: String,
  category: String,
  title: String,
  image: String,
  imagePosition: { type: String, default: "center" },
  order: Number,
});

const ProductShowcaseSchema = new mongoose.Schema({
  label: String,
  heading: String,
  description: String,
  buttonText: String,
  buttonLink: String,
  buttonTextColor: String,
  buttonBgColor: String,
  sliderItems: [SliderItemSchema],
});

module.exports = mongoose.model("ProductShowcase", ProductShowcaseSchema);
