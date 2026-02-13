const mongoose = require("mongoose");

const PhilosophyBlockSchema = new mongoose.Schema({
  title: String,
  text: String,
});

const AboutSchema = new mongoose.Schema({
  banner: {
    title: String,
    breadcrumb: String,
    image: String,
  },
  intro: {
    tag: String,
    heading1: String,
    heading2: String,
    para1: String,
    para2: String,
    buttonText: String,
    buttonLink: String,
  },
  images: {
    main: String,
    square: String,
    wide: String,
  },
  experience: {
    years: String,
    label: String,
  },
  philosophy: {
    quote: String,
    blocks: [PhilosophyBlockSchema],
  },
});

module.exports = mongoose.model("AboutPage", AboutSchema);
