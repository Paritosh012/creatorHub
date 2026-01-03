const Product = require("../models/productModel");
const generateUniqueSlug = require("../utils/slug");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const getAllProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.popular === "true") filter.isPopular = true;
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter)
      .populate("creator", "name")
      .sort({ createdAt: -1 });

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
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "creator",
      "name"
    );

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
    const { title, description, price, category, isFree, tags } = req.body;

    if (!req.files?.thumbnail || !req.files?.file) {
      return res.status(400).json({ msg: "Files are required" });
    }

    const slug = await generateUniqueSlug(title);

    const thumbnailUpload = await uploadToCloudinary(
      req.files.thumbnail[0].buffer,
      "creatorhub/thumbnails",
      "image"
    );

    const fileUpload = await uploadToCloudinary(
      req.files.file[0].buffer,
      "creatorhub/products",
      "raw"
    );

    const product = await Product.create({
      title,
      slug,
      description,
      price: Number(price),
      isFree: isFree === "true",
      category,
      tags: Array.isArray(tags) ? tags : [tags],
      thumbnail: thumbnailUpload.secure_url,
      fileUrl: fileUpload.secure_url,
      creator: req.user.id,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const getCreatorProducts = async (req, res) => {
  try {
    const creatorId = req.user.id;

    const products = await Product.find({ creator: creatorId })
      .populate("creator", "name")
      .sort({ createdAt: -1 });

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
    if (!product) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    // ownership check
    if (product.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false, msg: "Unauthorized" });
    }

    const { title, description, price, category, isFree, tags } = req.body;

    // regenerate slug ONLY if title changed
    if (title && title !== product.title) {
      product.slug = await generateUniqueSlug(title);
      product.title = title;
    }

    if (description) product.description = description;
    if (price !== undefined) product.price = Number(price);
    if (isFree !== undefined) product.isFree = isFree === "true";
    if (category) product.category = category;
    if (tags) product.tags = Array.isArray(tags) ? tags : [tags];

    // 🔥 thumbnail replacement
    if (req.files?.thumbnail) {
      const thumbUpload = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        "creatorhub/thumbnails",
        "image"
      );
      product.thumbnail = thumbUpload.secure_url;
    }

    // 🔥 product file replacement
    if (req.files?.file) {
      const fileUpload = await uploadToCloudinary(
        req.files.file[0].buffer,
        "creatorhub/products",
        "raw"
      );
      product.fileUrl = fileUpload.secure_url;
    }

    await product.save();

    res.json({ success: true, product });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
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
