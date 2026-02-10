const mongoose = require("mongoose");

const TestimonialItemSchema = new mongoose.Schema({
  id: String,
  src: String,
  name: String,
  rating: Number,
  review: String,

  // layout controls
  x: Number,
  y: Number,
  w: Number,
  h: Number,
});

const TestimonialLayoutSchema = new mongoose.Schema({
  items: [TestimonialItemSchema],
});

module.exports = mongoose.model(
  "TestimonialLayout",
  TestimonialLayoutSchema
);
