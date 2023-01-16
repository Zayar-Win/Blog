const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");

router.get(
  "/",
  categoryController.getAllCategories
);

router.post(
  "/",
  auth,
  categoryController.createCategory
);

router.patch(
  "/:id",
  auth,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  auth,
  categoryController.deleteCategory
);

module.exports = router;
