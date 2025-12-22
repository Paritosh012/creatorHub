const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.popular === "true") filter.isPopular = true;
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ success: false });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      creator: req.user.id,
      status: "published",
      isPopular: false,
    });

    if (req.user.role !== "creator") {
      return res.status(403).json({ success: false, msg: "Not a creator" });
    }

    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

const getCreatorProducts = async (req, res) => {
  try {
    const creatorId = req.user.id; // from auth middleware

    const products = await Product.find({ creator: creatorId }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    console.error("CREATOR PRODUCTS ERROR:", err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  createProduct,
  getCreatorProducts,
};
