const Category = require("../models/Category");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (err) {
    res.sendStatus(500);
  }
};

const createCategory = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized" });
    const { name } = req.body;
    if (!name)
      return res
        .status(400)
        .json({ message: "Name is required" });
    const category = await Category.create({
      name,
    });
    res.status(201).json({
      message:
        "New category create Successful!!!",
      category,
    });
  } catch (err) {
    let errmessage;
    console.log(err.code);
    if (err.code === 11000) {
      errmessage =
        Object.values(err.keyValue) +
        " already exist!!!";
    }

    res.status(500).json({ message: errmessage });
  }
};

const updateCategory = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(401)
        .json({ message: "Unauthorized!!" });
    const { name } = req.body;
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        message: "Update Id is required!!",
      });
    const oldCategory =
      await Category.findByIdAndUpdate(
        { _id: id },
        {
          name,
        }
      );
    res
      .status(201)
      .json({ message: "Update successful!!!" });
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res
        .status(400)
        .json({ message: "Unauthorized!!!" });
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ message: "Id is required!!!" });
    await Category.findByIdAndDelete({ _id: id });
    res
      .status(201)
      .json({ message: "Delete success!!!" });
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
