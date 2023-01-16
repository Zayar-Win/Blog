const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required!!"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: [
        isEmail,
        "Please enter a valid email",
      ],
    },
    avatar: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsIT2FkYzXlY2ZbWdgx92VUwLxB2O-7j7wBg&usqp=CAU",
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [
        6,
        "Password is more than 6 characters",
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
