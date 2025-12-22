const express = require("express");
const {
  getAllProducts,
  getProductBySlug,
  getCreatorProducts,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/creator", verifyToken, getCreatorProducts);

router.get("/", getAllProducts);

router.get("/:slug", getProductBySlug);

module.exports = router;
