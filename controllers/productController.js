const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 1. Upload Handler (Stays mostly the same, but optimized)
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "studio_archives", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Cloudinary Upload Failed", error: err.message });
  }
};

// 2. Upsert Handler (Updated for deep data)
exports.upsertProduct = async (req, res) => {
  const { _id, ...data } = req.body;
  try {
    // If tags were sent as a string from the UI, we convert them to an array here
    if (typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(tag => tag.trim());
    }

    const product = _id 
      ? await Product.findByIdAndUpdate(_id, data, { new: true, runValidators: true }) 
      : await new Product(data).save();
      
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "Database Sync Failed", error: err.message });
  }
};

// 3. Delete Handler (NEW - To match the Trash icon in your UI)
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Artifact removed from archive" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};