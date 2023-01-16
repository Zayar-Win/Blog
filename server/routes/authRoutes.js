const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  createActiveToken,
  createAccessToken,
  createRefreshToken,
} = require("../config/createActiveToken");
const jwt = require("jsonwebtoken");
const {
  validRegister,
  validateEmail,
} = require("../middlewares/valid");
const sendMail = require("../config/sendMail");

const router = require("express").Router();

router.post(
  "/register",
  validRegister,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await User.findOne({ email });
      if (user)
        res
          .status(400)
          .json({ message: "User already exit" });
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(
        password,
        salt
      );
      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      const token = createActiveToken(newUser);
      const clientUrl = process.env.BASE_URL;
      const url = `${clientUrl}/active/${token}`;
      if (validateEmail(email)) {
        sendMail(email, url, "Verify your email");
        return res.status(200).json({
          message: "Please check ur email!!",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

router.post("/active", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token)
      res.status(400).json({
        message: "User token doesn't valid!!",
      });
    const { name, email, password } = jwt.verify(
      token,
      process.env.ACTIVETOKEN_SECRET
    );
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).json({
      message: "User created successful!!",
    });
  } catch (error) {
    let errMessage;
    if (error.code === 11000) {
      errMessage =
        Object.values(error.keyValue)[0] +
        " already exists";
    } else {
      errMessage = "Your token doesn't valid!!";
    }
    res.status(500).json({ message: errMessage });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        message: "This emial doesn't exist",
      });

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isMatch)
      return res.status(400).json({
        message: "Password is incorrect",
      });

    const access_token = createAccessToken({
      id: user._id,
    });
    const refresh_token = createRefreshToken({
      id: user._id,
    });

    res
      .status(200)
      .cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: `/api/auth/refreshtoken`,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        access_token,
        user: { ...user._doc, password: "" },
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("refreshtoken", {
      path: `/api/auth/refreshtoken`,
    });
    return res
      .status(200)
      .json({ message: "logged out!!!!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message });
  }
});

router.get("/refreshtoken", async (req, res) => {
  const token = req.cookies.refreshtoken;
  if (!token)
    return res
      .status(400)
      .json({ message: "Please Login!!!" });
  const { id } = jwt.verify(
    token,
    process.env.REFRESHTOKEN_SECRET
  );
  const user = await User.findById(id);
  if (!user)
    res.status(400).json({
      message: "Account doesn't exist!!!",
    });

  const access_token = createAccessToken({
    id: user._id,
  });
  res.status(200).json({ access_token, user });
});

module.exports = router;
