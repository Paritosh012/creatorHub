const User = require("../models/user.model");
const Product = require("../models/product.model");

exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ success: false });
  res.json({ success: true, user });
};

exports.becomeCreator = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { role: "creator" },
    { new: true }
  );
  res.json({ success: true, user });
};

exports.creatorProfile = async (req, res) => {
  const creator = await User.findById(req.params.id);
  if (!creator || creator.role !== "creator")
    return res.status(404).json({ success: false });

  const products = await Product.find({
    creator: creator._id,
    status: "published",
  });

  res.json({ success: true, creator, products });
};
