const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
require("dotenv").config();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,       // MUST be false on localhost
  sameSite: "lax",     // MUST be lax on localhost
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    email = email.toLowerCase().trim();
    name = name.trim();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        msg: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(201)
      .cookie("token", token, COOKIE_OPTIONS)
      .json({
        success: true,
        msg: "Successfully registered",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("registerUser error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during registration",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    email = email.toLowerCase().trim();

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .cookie("token", token, COOKIE_OPTIONS)
      .json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (error) {
    console.error("loginUser error:", error);
    res.status(500).json({
      success: false,
      error: "Server error during login",
    });
  }
};

const me = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("GET /me error:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

const becomeCreator = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { role: "creator" },
      { new: true }
    );

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    })
    .json({ success: true, msg: "Logged out" });
};

module.exports = {
  registerUser,
  loginUser,
  me,
  becomeCreator,
  logoutUser,
};
