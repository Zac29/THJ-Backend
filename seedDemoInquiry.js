// ---- DEV ONLY: seed demo inquiry ----
exports.seedDemoInquiry = async () => {
  const count = await Inquiry.countDocuments();

  if (count === 0) {
    await Inquiry.create({
      name: "Demo Customer",
      email: "demo@email.com",
      message: "Hello, I am interested in your Tibetan collection. Please guide me.",
      replied: false,
    });

    console.log("✅ Demo inquiry inserted");
  }
};
