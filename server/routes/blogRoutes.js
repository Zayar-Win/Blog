const router = require("express").Router();
const auth = require("../middlewares/auth");
const blogController = require("../controllers/BlogController");

router.post(
  "/createblog",
  auth,
  blogController.createBlog
);
router.get("/search", blogController.searchBlog);

router.get("/getblogs", blogController.getBlogs);

router.get(
  "/category/:category_id",
  blogController.getBlogsByCategory
);

router.get("/:id", blogController.getBlogDetails);

router.put(
  "/:id",
  auth,
  blogController.updateBlog
);

router.get(
  "/user/:id",
  blogController.getBlogsByUser
);

router.delete(
  "/:id",
  auth,
  blogController.deleteBlog
);

module.exports = router;
