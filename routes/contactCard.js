const express = require("express");
const router = express.Router();
const ContactCard = require("../models/ContactCard");

/* GET – Frontend Modal */
router.get("/card", async (req, res) => {
  try {
    let card = await ContactCard.findOne();
    if (!card) {
      card = await ContactCard.create({
        phone: "+91 98765 43210",
        email: "info@yourbrand.com",
        locationText: "Jaipur, Rajasthan, India",
      });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contact card" });
  }
});

/* PUT – Admin Update */
router.put("/card", async (req, res) => {
  try {
    const updated = await ContactCard.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

/* RESET – Optional */
router.post("/card/reset", async (req, res) => {
  try {
    await ContactCard.deleteMany({});
    const fresh = await ContactCard.create({
      phone: "+91 98765 43210",
      email: "info@yourbrand.com",
      locationText: "Jaipur, Rajasthan, India",
    });
    res.json(fresh);
  } catch (err) {
    res.status(500).json({ message: "Reset failed" });
  }
});

module.exports = router;
