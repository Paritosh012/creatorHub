const Product = require("../models/product.model");
const slug = require("../utils/slug");
const upload = require("../utils/uploadToCloudinary");

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.popular === "true") filter.isPopular = true;
  if (req.query.category) filter.category = req.query.category;

  const products = await Product.find(filter)
    .populate("creator", "name")
    .sort({ createdAt: -1 });

  res.json({ success: true, products });
};

exports.getOne = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate(
    "creator",
    "name"
  );
  if (!product) return res.status(404).json({ success: false });
  res.json({ success: true, product });
};

exports.create = async (req, res) => {
  if (!req.files?.thumbnail || !req.files?.file)
    return res.status(400).json({ success: false });

  const s = await slug(req.body.title);

  const thumb = await upload(
    req.files.thumbnail[0].buffer,
    "creatorhub/thumbnails",
    "image"
  );
  const file = await upload(
    req.files.file[0].buffer,
    "creatorhub/products",
    "raw"
  );

  const product = await Product.create({
    ...req.body,
    slug: s,
    price: req.body.isFree === "true" ? 0 : Number(req.body.price),
    isFree: req.body.isFree === "true",
    thumbnail: thumb.secure_url,
    fileUrl: file.secure_url,
    creator: req.user.id,
  });

  res.status(201).json({ success: true, product });
};

exports.update = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false });

  if (product.creator.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ success: false });

  Object.assign(product, req.body);

  if (req.body.title && req.body.title !== product.title)
    product.slug = await slug(req.body.title);

  if (req.files?.thumbnail) {
    const t = await upload(
      req.files.thumbnail[0].buffer,
      "creatorhub/thumbnails",
      "image"
    );
    product.thumbnail = t.secure_url;
  }

  if (req.files?.file) {
    const f = await upload(
      req.files.file[0].buffer,
      "creatorhub/products",
      "raw"
    );
    product.fileUrl = f.secure_url;
  }

  await product.save();
  res.json({ success: true, product });
};

exports.remove = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false });

  if (product.creator.toString() !== req.user.id && req.user.role !== "admin")
    return res.status(403).json({ success: false });

  await product.deleteOne();
  res.json({ success: true });
};
