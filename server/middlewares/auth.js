const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    if (!token)
      return res.status(400).json({
        message: "Invalid authentication",
      });
    const decoded = jwt.verify(
      token,
      process.env.ACCESSTOKEN_SECRET
    );
    const user = await User.findOne({
      _id: decoded.id,
    });
    if (!user)
      return res.status(400).json({
        message: "User doesn't exist!!!",
      });

    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = auth;
