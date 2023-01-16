const bcrypt = require("bcrypt");
const User = require("../models/User");

const profileUpdate = async (req, res) => {
  try {
    const { name, avatar } = req.body;

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        name,
        avatar,
      }
    );
    res.status(200).json({
      message: "Update Successful!!",
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(
      password,
      salt
    );
    const user = req.user;
    if (!user)
      return res.status(400).json({
        message: "User doesn't exist!!",
      });
    await User.findOneAndUpdate(
      { _id: user._id },
      { password: hashPassword }
    );
    res.status(201).json({
      message: "Password reset success!!!",
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

const getOtherUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );
    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

module.exports = {
  profileUpdate,
  resetPassword,
  getOtherUser,
};
