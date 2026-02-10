const router = require("express").Router();
const {
  getAbout,
  updateAbout,
  resetAbout,
} = require("../controllers/about.controller");

router.get("/", getAbout);
router.put("/", updateAbout);
router.post("/reset", resetAbout);

module.exports = router;
