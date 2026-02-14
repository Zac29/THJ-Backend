const express = require("express");
const router = express.Router();
const multer = require("multer");
const CategorySlider = require("../models/CategorySlider");
const DEFAULT = require("../defaultData/categorySliderData");
const cloudinary = require("../utils/cloudinary");

/* ---------------- MULTER ---------------- */
const upload = multer({ storage: multer.memoryStorage() });

/* ---------------- GET SLIDER ---------------- */
router.get("/", async (req, res) => {
  try {
    let slider = await CategorySlider.findOne();
    if (!slider) slider = await CategorySlider.create(DEFAULT);
    res.json(slider);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- UPDATE SLIDER ---------------- */
router.put("/", async (req, res) => {
  try {
    const updated = await CategorySlider.findOneAndUpdate(
      {},
      {
        heading: req.body.heading,
        description: req.body.description,
        items: req.body.items,
      },
      {
        new: true,
        upsert: true,
        runValidators: true, // 🔥 safety
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ---------------- RESET ---------------- */
router.post("/reset", async (req, res) => {
  try {
    await CategorySlider.deleteMany();
    const reset = await CategorySlider.create(DEFAULT);
    res.json(reset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- IMAGE UPLOAD ---------------- */
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image provided" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "category-slider" },
        (err, uploaded) => {
          if (err) reject(err);
          else resolve(uploaded);
        }
      ).end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
