const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

route.post("/register", userController.registerUser);
route.post("/login", userController.loginUser);

route.get("/me", verifyToken, userController.me);

module.exports = route;
