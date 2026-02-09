const router = require("express").Router();
const { loginAdmin, verifyAdmin } = require("../controllers/adminController");
const adminAuth = require("../middleware/adminAuth");

router.post("/login", loginAdmin);
router.get("/verify", adminAuth, verifyAdmin);

module.exports = router;
