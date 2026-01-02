const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    email = email.toLowerCase().trim();
    name = String(name).trim();

    const existingEmail = await userModel.findOne({ email });

    if (existingEmail)
      return res.status(409).json({
        success: false,
        msg: "User already exists",
      });

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
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
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

    return res
      .status(500)
      .json({ success: false, error: "Server error during registration" });
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

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
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
    return res
      .status(500)
      .json({ success: false, error: "Server error during login" });
  }
};

const me = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, error: "User not found" });
    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("GET /me error:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

const becomeCreator = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
      { role: "creator" },
      { new: true }
    );

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
    })
    .json({ success: true, msg: "Logged out" });
};

module.exports = { registerUser, loginUser, me, becomeCreator, logoutUser };
