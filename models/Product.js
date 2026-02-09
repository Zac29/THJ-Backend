// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, // Main thumbnail
  gallery: [{ type: String }],            // For the Gallery.tsx component
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  tag: { type: String, default: "" },      // e.g., "sale", "new"
  tagColor: { type: String, default: "#1c1917" },
  category: { type: String, required: true }, // e.g., "Archive"
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  
  // Selection logic for ProductActions.tsx
  colors: { type: [String], default: [] }, // Array of Hex codes
  sizes: { type: [String], default: ["Standard"] },
  
  // Metadata for Storefront
  tags: [{ type: String }], // Artisan Tags
  rating: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);