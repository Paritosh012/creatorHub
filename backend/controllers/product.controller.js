const Product = require("../models/product.model");
const slugify = require("../utils/slug");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

/* ---------------- GET ALL ---------------- */
exports.getAll = async (req, res) => {
  try {
    const filter = {};
    if (req.query.popular === "true") filter.isPopular = true;
    if (req.query.category) filter.category = req.query.category;

    const products = await Product.find(filter)
      .populate("creator", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ---------------- GET ONE ---------------- */
exports.getOne = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    }).populate("creator", "name");

    if (!product)
      return res.status(404).json({ success: false });

    res.json({ success: true, product });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ---------------- CREATE ---------------- */
exports.create = async (req, res) => {
  try {
    if (!req.files?.thumbnail || !req.files?.file)
      return res.status(400).json({ success: false });

    const newSlug = await slugify(req.body.title);

    const thumb = await uploadToCloudinary(
      req.files.thumbnail[0].buffer,
      "creatorhub/thumbnails",
      "image"
    );

    const file = await uploadToCloudinary(
      req.files.file[0].buffer,
      "creatorhub/products",
      "raw"
    );

    const price = Number(req.body.price || 0);

    const product = await Product.create({
      title: req.body.title,
      slug: newSlug,
      description: req.body.description,
      price,
      isFree: price === 0,
      category: req.body.category,
      tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      thumbnail: thumb.secure_url,
      fileUrl: file.secure_url,
      creator: req.user.id,
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

/* ---------------- UPDATE ---------------- */
exports.update = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false });

    if (
      product.creator.toString() !== req.user.id &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ success: false });

    const oldTitle = product.title;

    const allowed = ["title", "description", "price", "category"];
    allowed.forEach((key) => {
      if (req.body[key] !== undefined) {
        product[key] = req.body[key];
      }
    });

    if (req.body.tags) {
      product.tags = JSON.parse(req.body.tags);
    }

    product.price = Number(product.price || 0);
    product.isFree = product.price === 0;

    if (req.body.title && req.body.title !== oldTitle) {
      product.slug = await slugify(req.body.title);
    }

    if (req.files?.thumbnail) {
      const t = await uploadToCloudinary(
        req.files.thumbnail[0].buffer,
        "creatorhub/thumbnails",
        "image"
      );
      product.thumbnail = t.secure_url;
    }

    if (req.files?.file) {
      const f = await uploadToCloudinary(
        req.files.file[0].buffer,
        "creatorhub/products",
        "raw"
      );
      product.fileUrl = f.secure_url;
    }

    await product.save();
    res.json({ success: true, product });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ---------------- DELETE ---------------- */
exports.remove = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false });

    if (
      product.creator.toString() !== req.user.id &&
      req.user.role !== "admin"
    )
      return res.status(403).json({ success: false });

    await product.deleteOne();
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
};

/* ---------------- GET BY CREATOR ---------------- */
exports.getByCreator = async (req, res) => {
  try {
    const products = await Product.find({
      creator: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("creator", "name");

    res.json({ success: true, products });
  } catch {
    res.status(500).json({ success: false });
  }
};
