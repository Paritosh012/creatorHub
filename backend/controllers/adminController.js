const Product = require("../models/productModel");
const mongoose = require("mongoose");

const adminCreateProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,

      // required by schema
      creator: new mongoose.Types.ObjectId(),

      // admin-controlled fields
      status: "published",
      isPopular: false,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("ADMIN CREATE ERROR:", error);
    res.status(400).json({
      success: false,
      message: "Admin product creation failed",
    });
  }
};

module.exports = { adminCreateProduct };
