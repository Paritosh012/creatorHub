const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes")

const app = express();
const PORT = process.env.PORT || 8000; 

if (!process.env.JWT_SECRET || !process.env.DBCONNECTIONSTRING) {
  console.error("❌ Missing env variables");
  process.exit(1);
}

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://creator-hub-82iz.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, msg: "Server error" });
});

mongoose
  .connect(process.env.DBCONNECTIONSTRING)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(() => process.exit(1));
