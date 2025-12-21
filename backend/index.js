const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8000;
const cors = require("cors");
const userRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);
app.use("/api/products", productRoutes);

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
