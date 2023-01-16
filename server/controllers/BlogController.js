const { default: mongoose } = require("mongoose");
const Blog = require("../models/BlogModal");
const Comment = require("../models/Comment");

const pagination = (req) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.size * 1 || 4;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const createBlog = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(400).json({
        message: "Please login to createBlog",
      });
    const {
      title,
      description,
      thumbnail,
      content,
      category,
    } = req.body;
    const blog = await Blog.create({
      user: user._id,
      title,
      description,
      thumbnail,
      content,
      category,
    });

    res.status(201).json({
      message: "Blog create successful",
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      //join with user table
      {
        $lookup: {
          from: "users",
          let: { user_id: "$user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$user_id"],
                },
              },
            },
            {
              $project: { password: 0 },
            },
          ],
          as: "user",
        },
      },
      //changing user array -> object
      { $unwind: "$user" },
      //join with category table
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      //changing category array -> object
      {
        $unwind: "$category",
      },
      //sort
      {
        $sort: { createdAt: -1 },
      },
      //gorup by category
      {
        $group: {
          _id: "$category._id",
          name: { $first: "$category.name" },
          blogs: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      //pagination
      {
        $project: {
          blogs: {
            $slice: ["$blogs", 0, 4],
          },
          count: 1,
          name: 1,
        },
      },
    ]);
    res.status(200).json({ blogs });
  } catch (err) {
    res.sendStatus(500);
  }
};

const getBlogsByCategory = async (req, res) => {
  try {
    const { skip, limit } = pagination(req);
    const data = await Blog.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                category: mongoose.Types.ObjectId(
                  req.params.category_id
                ),
              },
            },
            {
              $lookup: {
                from: "users",
                let: { user_id: "$user" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: [
                          "$_id",
                          "$$user_id",
                        ],
                      },
                    },
                  },
                  { $project: { password: 0 } },
                ],
                as: "user",
              },
            },
            { $unwind: "$user" },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [
            {
              $match: {
                category: mongoose.Types.ObjectId(
                  req.params.category_id
                ),
              },
            },
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          count: {
            $arrayElemAt: [
              "$totalCount.count",
              0,
            ],
          },
          totalData: 1,
        },
      },
    ]);
    const blogs = data[0].totalData;
    const count = data[0].count;
    let total = 0;
    if (count % limit === 0) {
      total = count / limit;
    } else {
      total = Math.floor(count / limit) + 1;
    }
    res.status(200).json({ blogs, total });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const getBlogsByUser = async (req, res) => {
  try {
    const { limit, skip } = pagination(req);
    const data = await Blog.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                user: mongoose.Types.ObjectId(
                  req.params.id
                ),
              },
            },
            {
              $lookup: {
                from: "users",
                let: { user_id: "$user" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: [
                          "$_id",
                          "$$user_id",
                        ],
                      },
                    },
                  },
                ],
                as: "user",
              },
            },
            { $unwind: "$user" },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [
            {
              $match: {
                user: mongoose.Types.ObjectId(
                  req.params.id
                ),
              },
            },
            {
              $count: "count",
            },
          ],
        },
      },
      {
        $project: {
          count: {
            $arrayElemAt: [
              "$totalCount.count",
              0,
            ],
          },
          totalData: 1,
        },
      },
    ]);

    const blogs = data[0].totalData;
    const count = data[0].count;
    let total;
    if (count % limit === 0) {
      total = count / limit;
    } else {
      total = Math.floor(count / limit) + 1;
    }

    res.status(200).json({ blogs, total });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const getBlogDetails = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    ).populate("user", "-password");
    res.status(200).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );

    if (!blog)
      return res.status(402).json({
        message: "Something went wrong",
      });

    const newBlog = {
      ...blog._doc,
      user: req.user,
    };

    res.status(201).json(newBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!blog)
      return res.status(402).json({
        message: "Something went wrong!!",
      });

    await Comment.deleteMany({
      blog_id: blog._id,
    });

    res.status(201).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const searchBlog = async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      {
        $search: {
          index: "searchText",
          autocomplete: {
            query: `${req.query.title}`,
            path: "title",
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $limit: 5,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          title: 1,
          description: 1,
          thumbnail: 1,
          createdAt: 1,
          user: 1,
        },
      },
    ]);

    res.status(200).json(blogs);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};
module.exports = {
  createBlog,
  getBlogs,
  getBlogsByCategory,
  getBlogsByUser,
  getBlogDetails,
  updateBlog,
  deleteBlog,
  searchBlog,
};
