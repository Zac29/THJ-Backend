const Footer = require("../models/Footer");
const defaultData = require("../defaultData/footerData.json");

exports.getFooter = async (req, res) => {
  let data = await Footer.findOne();
  if (!data) data = await Footer.create(defaultData);
  res.json(data);
};

exports.updateFooter = async (req, res) => {
  const data = await Footer.findOneAndUpdate(
    {},
    req.body,
    { upsert: true, new: true }
  );
  res.json(data);
};

exports.resetFooter = async (req, res) => {
  await Footer.deleteMany();
  const data = await Footer.create(defaultData);
  res.json(data);
};
