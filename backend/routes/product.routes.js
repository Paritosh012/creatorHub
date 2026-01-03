const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductBySlug,
  getCreatorProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} = require("../controllers/productController");
const verifyToken = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");

/* ✅ LIST PRODUCTS (FIRST) */
router.get("/", getAllProducts);

/* ✅ CREATOR PRODUCTS */
router.get("/creator", verifyToken, getCreatorProducts);

/* ✅ CREATE */
router.post(
  "/dashboard/create",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createProduct
);

/* ✅ UPDATE */
router.put(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateProduct
);

/* ✅ DELETE */
router.delete("/:id", verifyToken, deleteProduct);

/* ✅ SINGLE PRODUCT (ALWAYS LAST) */
router.get("/:slug", getProductBySlug);

// GET PROFILE
router.get("/creator/:id", getCreatorProfile);


module.exports = router;
