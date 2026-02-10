const router = require("express").Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const {
  getLayout,
  updateLayout,
  resetLayout,
} = require("../controllers/testimonialController");

// ✅ Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "testimonials",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

router.get("/", getLayout);
router.put("/", updateLayout);
router.post("/reset", resetLayout);

// ✅ IMAGE UPLOAD
router.post("/upload", upload.single("image"), (req, res) => {
  res.json({ url: req.file.path });
});

module.exports = router;
