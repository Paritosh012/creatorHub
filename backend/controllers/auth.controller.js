const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 
const User = require("../models/user.model");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false });

  if (await User.findOne({ email }))
    return res.status(409).json({ success: false });

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, COOKIE_OPTIONS).json({
    success: true,
    user: { id: user._id, name: user.name, role: user.role },
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ success: false });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, COOKIE_OPTIONS).json({
    success: true,
    user: { id: user._id, name: user.name, role: user.role },
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS).json({ success: true });
};
