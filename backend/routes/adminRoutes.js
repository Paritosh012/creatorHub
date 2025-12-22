const express = require("express");
const { adminCreateProduct } = require("../controllers/adminController");


const router = express.Router();

// demo admin route
router.post("/products/create", adminCreateProduct);

module.exports = router;
