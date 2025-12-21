const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/productModel");
const User = require("../models/userModel");

const categories = [
  "ui-kits",
  "templates",
  "dashboards",
  "icons",
  "illustrations",
  "3d-assets",
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomBool = (chance = 0.4) => Math.random() < chance;

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.DBCONNECTIONSTRING);
    console.log("DB connected");

    const creator = await User.findOne();
    if (!creator) {
      throw new Error("Create at least one user before seeding products.");
    }

    // clear old products
    await Product.deleteMany();

    const products = [];

    for (let i = 1; i <= 50; i++) {
      const category = randomFrom(categories);

      products.push({
        title: `Premium ${category.toUpperCase()} Asset #${i}`,
        slug: `${category}-asset-${i}`,
        description: `High-quality ${category} asset designed for modern creators. Asset number ${i}.`,
        price: randomBool(0.2) ? 0 : Math.floor(Math.random() * 700) + 199,
        isFree: randomBool(0.2),
        thumbnail: `https://picsum.photos/seed/${category}${i}/600/420`,
        previewImages: [
          `https://picsum.photos/seed/${category}${i}a/600/420`,
          `https://picsum.photos/seed/${category}${i}b/600/420`,
        ],
        fileUrl: `https://example.com/files/${category}-${i}.zip`,
        category,
        tags: [category, "premium", "creatorhub"],
        creator: creator._id,
        status: "published",
        views: Math.floor(Math.random() * 5000),
        downloads: Math.floor(Math.random() * 2000),
        isPopular: randomBool(0.35),
        licenseType: randomFrom(["personal", "commercial"]),
      });
    }

    await Product.insertMany(products);

    console.log("✅ 50 products inserted successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedProducts();
