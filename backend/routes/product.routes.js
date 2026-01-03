const router = require("express").Router();
const verify = require("../middlewares/verifyToken");
const upload = require("../middlewares/upload");
const c = require("../controllers/product.controller");

router.get("/", c.getAll);
router.get("/:slug", c.getOne);

router.post(
  "/",
  verify,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  c.create
);

router.put(
  "/:id",
  verify,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  c.update
);

router.delete("/:id", verify, c.remove);

module.exports = router;
