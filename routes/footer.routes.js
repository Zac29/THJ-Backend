const router = require("express").Router();
const {
  getFooter,
  updateFooter,
  resetFooter,
} = require("../controllers/footerController");

router.get("/", getFooter);
router.put("/", updateFooter);
router.post("/reset", resetFooter);

module.exports = router;
