const Product = require("../models/productModel");
const generateUniqueSlug = require("../utils/slug");

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
    if (req.user.role !== "creator") {
      return res.status(403).json({ success: false, msg: "Not a creator" });
    }

    const {
      title,
      description,
      price,
      isFree,
      category,
      tags,
      thumbnail,
      fileUrl,
      previewImages,
      licenseType,
    } = req.body;

    if (!title || !description || !category || !thumbnail || !fileUrl) {
      return res.status(400).json({ success: false, msg: "Missing fields" });
    }

    const slug = await generateUniqueSlug(title);

    const product = await Product.create({
      title,
      slug,
      description,
      price: isFree ? 0 : price,
      isFree,
      category,
      tags,
      thumbnail,
      previewImages,
      fileUrl,
      licenseType,
      creator: req.user.id,
      status: "published",
      isPopular: false,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(400).json({ success: false, msg: err.message });
  }
};

const getCreatorProducts = async (req, res) => {
  try {
    const creatorId = req.user.id;

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

module.exports = {
  getAllProducts,
  getProductBySlug,
  createProduct,
  getCreatorProducts,
  updateProduct,
  deleteProduct,
};
