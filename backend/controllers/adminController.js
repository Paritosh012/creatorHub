const Product = require("../models/productModel");
const mongoose = require("mongoose");
const generateUniqueSlug = require("../utils/slug");

const adminCreateProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false });
    }

    const slug = await generateUniqueSlug(req.body.title);

    const product = await Product.create({
      ...req.body,
      slug,
      creator: req.user.id, // admin is owner
      status: "published",
      isPopular: false,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("ADMIN CREATE ERROR:", err);
    res.status(400).json({ success: false, msg: err.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false });

    if (product.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false });
    }

    if (req.body.title && req.body.title !== product.title) {
      product.slug = await generateUniqueSlug(req.body.title);
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false });

    if (product.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false });
    }

    await product.deleteOne();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};


module.exports = { adminCreateProduct ,updateProduct,deleteProduct};
