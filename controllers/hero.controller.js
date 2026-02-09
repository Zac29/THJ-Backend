const Hero = require("../models/Hero");

// Get hero config
exports.getHero = async (req, res) => {
  const hero = await Hero.findOne();
  res.json(hero);
};

// Create / Update hero
exports.updateHero = async (req, res) => {
  try {
    const { slides, style } = req.body;

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({ slides, style });
    } else {
      hero.slides = slides;
      hero.style = style;
    }

    await hero.save();
    res.json({ message: "Hero updated", hero });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload slide image
exports.uploadSlideImage = async (req, res) => {
  res.json({
    imageUrl: req.file.path,
  });
};
