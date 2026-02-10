require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

/* ---------------- CORS (VERY IMPORTANT) ---------------- */
app.use(
  cors({
    origin: "http://localhost:5175", // your Vite port
    credentials: true,
  })
);

/* ---------------- Middlewares ---------------- */
app.use(express.json());
app.use(cookieParser());

/* ---------------- Mongo ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------------- Routes ---------------- */
app.use("/api/hero", require("./routes/hero.routes"));
app.use("/api/hero/admin", require("./routes/adminRoutes")); // ✅ add this
app.use("/api/contact", require("./routes/contact.routes"));

app.use("/api/product-showcase", require("./routes/productShowcase.routes"));
app.use("/api/testimonials", require("./routes/testimonial.routes"));
app.use("/api/footer", require("./routes/footer.routes"));
app.use("/api/about", require("./routes/about.routes"));


/* ---------------- Server ---------------- */
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
