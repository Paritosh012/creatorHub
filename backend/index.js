const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://creator-hub-82iz.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

mongoose
  .connect(process.env.DBCONNECTIONSTRING)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.json({ message: "CreatorHub API running" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
