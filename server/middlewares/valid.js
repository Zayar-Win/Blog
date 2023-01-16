const validRegister = (req, res, next) => {
  const { email, name, password } = req.body;
  let errors = [];
  if (!name) errors.push("Name is required!!!");

  if (!email) {
    errors.push("Email is required!!!");
  } else if (!validateEmail(email)) {
    errors.push("Please enter a valid email!!!");
  }

  if (!password) {
    errors.push("Password is required!!");
  } else if (password.length < 6) {
    errors.push(
      "Password should have min length 6"
    );
  }
  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: errors });
  } else {
    next();
  }
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

module.exports = {
  validRegister,
  validateEmail,
};
