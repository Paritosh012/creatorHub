const express = require("express");
const router = express.Router();
const {
  getProductBySlug,
  getCreatorProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/", verifyToken, createProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);
router.get("/creator", verifyToken, getCreatorProducts);
router.get("/:slug", getProductBySlug);

module.exports = router;
