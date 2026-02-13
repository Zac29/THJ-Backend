const router = require("express").Router();
const ctrl = require("../controllers/contactController");
const adminAuth = require("../middleware/adminAuth");

router.get("/settings", ctrl.getSettings);
router.post("/settings", adminAuth, ctrl.updateSettings);

router.post("/inquiry", ctrl.submitInquiry);

router.get("/inquiries", adminAuth, ctrl.getInquiries);
router.post("/reply", adminAuth, ctrl.replyInquiry);

module.exports = router;
