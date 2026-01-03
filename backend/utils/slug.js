const Product = require("../models/product.model");

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

module.exports = async (title) => {
  const base = slugify(title);
  let slug = base;
  let count = 1;

  while (await Product.findOne({ slug })) {
    slug = `${base}-${count++}`;
  }

  return slug;
};
