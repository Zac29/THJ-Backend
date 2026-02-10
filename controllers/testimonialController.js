const TestimonialLayout = require("../models/TestimonialLayout");
const defaultData = require("../defaultData/testimonialsData.json");

/* ---------------- GET ---------------- */
exports.getLayout = async (req, res) => {
  let data = await TestimonialLayout.findOne();

  if (!data) {
    data = await TestimonialLayout.create(defaultData);
  }

  res.json(data);
};

/* ---------------- UPDATE ---------------- */
exports.updateLayout = async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "Invalid items format" });
  }

  const data = await TestimonialLayout.findOneAndUpdate(
    {},
    { items },
    { upsert: true, new: true }
  );

  res.json(data);
};

/* ---------------- RESET ---------------- */
exports.resetLayout = async (req, res) => {
  await TestimonialLayout.deleteMany();
  const data = await TestimonialLayout.create(defaultData);
  res.json(data);
};
