const jwt = require("jsonwebtoken");

const createActiveToken = (data) => {
  return jwt.sign(
    data,
    process.env.ACTIVETOKEN_SECRET,
    { expiresIn: "5m" }
  );
};

const createAccessToken = (data) => {
  return jwt.sign(
    data,
    process.env.ACCESSTOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
};
const createRefreshToken = (data) => {
  return jwt.sign(
    data,
    process.env.REFRESHTOKEN_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  createActiveToken,
  createAccessToken,
  createRefreshToken,
};
