const router = require("express").Router();
const ctrl = require("../controllers/contactController");
const adminAuth = require("../middleware/adminAuth");

router.post("/inquiry", ctrl.submitInquiry);

router.get("/inquiries", adminAuth, ctrl.getInquiries);
router.post("/reply", adminAuth, ctrl.replyInquiry);

router.get("/settings", ctrl.getSettings);
router.post("/settings", adminAuth, ctrl.updateSettings);

module.exports = router;
