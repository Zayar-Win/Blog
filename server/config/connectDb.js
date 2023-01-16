const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Mongodb connect success!!!");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
