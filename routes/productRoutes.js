const express = require('express');
const router = express.Router();
const multer = require('multer');
const productCtrl = require('../controllers/productController');

// Configuration for handling file buffers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// --- PRODUCT ROUTES ---

// Fetch all masterpieces for the inventory sidebar
router.get('/', productCtrl.getAllProducts);

// Create or Update an artifact (handles deep data like gallery/tags)
router.post('/upsert', productCtrl.upsertProduct);

// Handle Cloudinary streaming for main images and gallery items
router.post('/upload', upload.single('image'), productCtrl.uploadImage);

// NEW: Remove an artifact from the archive via its unique ID
router.delete('/:id', productCtrl.deleteProduct); 

module.exports = router;