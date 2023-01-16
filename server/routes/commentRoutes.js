const router = require("express").Router();
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");

router.post(
  "/",
  auth,
  commentController.createComment
);

router.get(
  "/blog/:id",
  commentController.getComments
);

router.post(
  "/reply-comment",
  auth,
  commentController.replyComment
);

router.post(
  "/:id",
  auth,
  commentController.updateComment
);

router.delete(
  "/:id",
  auth,
  commentController.deleteComment
);

module.exports = router;
