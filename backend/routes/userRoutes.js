const express = require("express");
const { becomeCreator, getCreatorProfile } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const { createProduct } = require("../controllers/productController");

const router = express.Router();

router.get("/become-creator", verifyToken, becomeCreator);
router.post("/dashboard/create", verifyToken, createProduct);

// GET PROFILE
router.get("/creator/:id", getCreatorProfile);

module.exports = router;
