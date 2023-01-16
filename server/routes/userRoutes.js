const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

router.patch(
  "/profileUpdate",
  auth,
  userController.profileUpdate
);

router.patch(
  "/resetPassword",
  auth,
  userController.resetPassword
);

router.get("/:id", userController.getOtherUser);

module.exports = router;
