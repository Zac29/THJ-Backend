const ProductShowcase = require("../models/ProductShowcase");
const path = require("path");

exports.getProductShow = async (req, res) => {
  try {
    const data = await ProductShowcase.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

exports.resetProductShow = async (req, res) => {
  try {
    await ProductShowcase.deleteMany({});
    
    // Explicitly pull the data
    const defaultData = require("../defaultData/ProductShowcaseDefault.json");

    // Use .insertMany or .create
    const data = await ProductShowcase.create(defaultData);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Reset failed: " + err.message });
  }
};