const router = require("express").Router();
const {
  getProductShow,
  updateProductShow,
  resetProductShow,
} = require("../controllers/ProductShowcaseController");

router.get("/", getProductShow);
router.put("/", updateProductShow);
router.post("/reset", resetProductShow);

module.exports = router;
