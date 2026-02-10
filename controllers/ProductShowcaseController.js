const ProductShowcase = require("../models/ProductShowcase");

// GET
exports.getProductShow = async (req, res) => {
  try {
    const data = await ProductShowcase.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE EVERYTHING
exports.updateProductShow = async (req, res) => {
  try {
    const data = await ProductShowcase.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RESET TO DEFAULT
exports.resetProductShow = async (req, res) => {
  try {
    await ProductShowcase.deleteMany();

    const defaultData = require("../defaultData/ProductShowcaseDefault.json");
    const data = await ProductShowcase.create(defaultData);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
