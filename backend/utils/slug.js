const Product = require("../models/productModel");

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const generateUniqueSlug = async (title) => {
  const base = slugify(title);
  let slug = base;
  let count = 1;

  while (await Product.findOne({ slug })) {
    slug = `${base}-${count++}`;
  }

  return slug;
};

module.exports = generateUniqueSlug;
