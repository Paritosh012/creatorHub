const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const c = require("../controllers/user.controller");

console.log("✅ user.routes.js loaded");

router.get("/me", verify, c.me);
router.put("/become-creator", verify, c.becomeCreator);
router.get("/creator/:id", c.creatorProfile);

module.exports = router;
