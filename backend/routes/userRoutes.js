const express = require("express");
const { becomeCreator } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const { createProduct } = require("../controllers/productController");

const router = express.Router();

router.put("/become-creator", verifyToken, becomeCreator);
router.post("/dashboard/create", verifyToken, createProduct);

module.exports = router;
