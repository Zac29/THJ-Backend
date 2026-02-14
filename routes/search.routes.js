const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/**
 * GET /api/search?q=ring
 */
router.get("/", async (req, res) => {
  const q = req.query.q || "";

  if (!q.trim()) {
    return res.json({ products: [], pages: [] });
  }

  const products = await Product.find({
    title: { $regex: q, $options: "i" }
  })
    .limit(6)
    .select("title image price");

  const pages = [
    { title: "Products", url: "/products" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" }
  ].filter(p => p.title.toLowerCase().includes(q.toLowerCase()));

  res.json({ products, pages });
});

module.exports = router;
