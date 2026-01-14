const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0 },
    isFree: { type: Boolean, default: false },

    thumbnail: { type: String, required: true },
    fileUrl: { type: String, required: true },

    category: { type: String, required: true, index: true },
    tags: [{ type: String, lowercase: true }],

    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
      index: true,
    },

    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },

    weeklyViews: { type: Number, default: 0 },
    weeklyDownloads: { type: Number, default: 0 },

    lastViewAt: { type: Date },
    lastDownloadAt: { type: Date },
  },
  { timestamps: true }
);

productSchema.index({
  weeklyDownloads: -1,
  weeklyViews: -1,
  createdAt: -1,
});

module.exports = mongoose.model("Product", productSchema);
