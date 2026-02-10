const AboutPage = require("../models/AboutPage");
const defaultData = require("../defaultData/aboutData.json");

exports.getAbout = async (req, res) => {
  let data = await AboutPage.findOne();
  if (!data) data = await AboutPage.create(defaultData);
  res.json(data);
};

exports.updateAbout = async (req, res) => {
  const data = await AboutPage.findOneAndUpdate({}, req.body, {
    upsert: true,
    new: true,
  });
  res.json(data);
};

exports.resetAbout = async (req, res) => {
  await AboutPage.deleteMany();
  const data = await AboutPage.create(defaultData);
  res.json(data);
};
