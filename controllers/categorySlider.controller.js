const express = require("express");
const router = express.Router();
const CategorySlider = require("../models/CategorySlider");
const DEFAULT = require("../defaultData/categorySliderData");

/* GET */
router.get("/", async (req, res) => {
  let slider = await CategorySlider.findOne();
  if (!slider) slider = await CategorySlider.create(DEFAULT);
  res.json(slider);
});

/* UPDATE */
router.put("/", async (req, res) => {
  const updated = await CategorySlider.findOneAndUpdate(
    {},
    req.body,
    { upsert: true, new: true }
  );
  res.json(updated);
});

/* RESET */
router.post("/reset", async (req, res) => {
  await CategorySlider.deleteMany();
  const reset = await CategorySlider.create(DEFAULT);
  res.json(reset);
});

module.exports = router;
