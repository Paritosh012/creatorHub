const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // 🔹 Core identity
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    // 🔹 Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    isFree: {
      type: Boolean,
      default: false,
    },

    // 🔹 Media
    thumbnail: {
      type: String,
      required: true,
    },

    previewImages: [
      {
        type: String,
      },
    ],

    fileUrl: {
      type: String,
      required: true,
    },

    // 🔹 Classification
    category: {
      type: String,
      required: true,
      index: true,
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    // 🔹 Ownership
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // 🔹 Status & moderation
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    // 🔹 Analytics
    views: {
      type: Number,
      default: 0,
    },

    downloads: {
      type: Number,
      default: 0,
    },

    isPopular: {
      type: Boolean,
      default: false,
      index: true,
    },

    // 🔹 Legal
    licenseType: {
      type: String,
      enum: ["personal", "commercial", "extended"],
      default: "personal",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
