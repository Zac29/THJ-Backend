require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const email = "admin@tbh.com";

   
    const plainPassword = "admin@123";

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await Admin.deleteMany({ email }); // avoid duplicates

    await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin created");
    console.log("Email:", email);
    console.log("Password:", plainPassword);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
