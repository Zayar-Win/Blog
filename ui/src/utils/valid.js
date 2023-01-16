export const validRegister = (registerdata) => {
  const {
    name,
    email,
    password,
    confirmPassword,
  } = registerdata;

  let errors = [];
  if (!name) {
    errors.push("Name is required!!");
  }
  if (!email) {
    errors.push("Email is required!!");
  } else if (!validateEmail(email)) {
    errors.push("Email is not valid!!!");
  }
  if (password.length < 6) {
    errors.push(
      "Password should have min 6 length"
    );
  }
  if (password !== confirmPassword) {
    errors.push(
      "Password and confirm does't match!!!"
    );
  }
  return {
    errLength: errors.length,
    errors,
  };
};

const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validBlog = (blogData) => {
  const {
    title,
    description,
    thumbnail,
    content,
    category,
  } = blogData;
  let err = [];
  if (!title) {
    err.push("Blog Title is required!!");
  }
  if (!description) {
    err.push("Blog description is required!!");
  }
  if (!thumbnail) {
    err.push("Thumbnail is required!!");
  }
  if (!content) {
    err.push("Blog content is required!!!");
  }
  if (!category) {
    err.push("Blog Category is required!!");
  }

  return {
    errMessage: err,
    errLength: err.length,
  };
};
