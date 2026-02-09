const express = require("express");
const router = express.Router();
const heroController = require("../controllers/hero.controller");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hero_slides",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

router.get("/", heroController.getHero);
router.post("/update", heroController.updateHero);
router.post("/upload", upload.single("image"), heroController.uploadSlideImage);

module.exports = router;
