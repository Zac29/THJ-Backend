const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const defaultProducts = require("../defaultData/defaultProducts");

/* Upload via memory (gallery + main) */
const upload = multer({ storage: multer.memoryStorage() });

/* Upload Image */
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "studio_products" },
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ url: result.secure_url });
      }
    );
    result.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* GET all products */
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

/* UPSERT */
router.post("/upsert", async (req, res) => {
  const { _id, ...data } = req.body;

  if (!data.image || data.image.trim() === "") {
    return res.status(400).json({
      message: "Cover image is required",
    });
  }

  const product = _id
    ? await Product.findByIdAndUpdate(_id, data, {
        new: true,
        runValidators: true,
      })
    : await Product.create(data);

  res.json(product);
});


/* DELETE */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// GET single product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// RESET PRODUCTS
router.post("/reset", async (req, res) => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(defaultProducts.map(p => ({
      ...p,
      _id: undefined, // force Mongo to regenerate
    })));

    res.json({ success: true, message: "Products reset to default" });
  } catch (err) {
    console.error("RESET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
