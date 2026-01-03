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
const upload = require("../middlewares/upload");

router.put(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateProduct
);

router.delete("/:id", verifyToken, deleteProduct);
router.get("/creator", verifyToken, getCreatorProducts);
router.get("/:slug", getProductBySlug);

router.post(
  "/dashboard/create",
  verifyToken,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createProduct
);

module.exports = router;
