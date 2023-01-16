const { response } = require("express");
const { default: mongoose } = require("mongoose");
const Comment = require("../models/Comment");
const myModule = require("../app");

const createComment = async (req, res) => {
  try {
    const user = req.user;
    const { blog_id, blog_user_id, content } =
      req.body;
    const comment = await Comment.create({
      blog_id,
      user: user._id,
      blog_user_id,
      content,
    });

    const newComment = {
      ...comment._doc,
      user: req.user,
    };

    myModule.io
      .to(`${blog_id}`)
      .emit("createComment", newComment);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const getComments = async (req, res) => {
  try {
    const data = await Comment.aggregate([
      {
        $facet: {
          totalData: [
            {
              $match: {
                blog_id: mongoose.Types.ObjectId(
                  req.params.id
                ),
                comment_root: { $exists: false },
                reply_user: { $exists: false },
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
              $lookup: {
                from: "comments",
                let: {
                  comment_id: "$replyComment",
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $in: [
                          "$_id",
                          "$$comment_id",
                        ],
                      },
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
                        {
                          $project: {
                            name: 1,
                            avatar: 1,
                          },
                        },
                      ],
                      as: "user",
                    },
                  },
                  {
                    $unwind: "$user",
                  },
                  {
                    $lookup: {
                      from: "users",
                      let: {
                        user_id: "$reply_user",
                      },
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
                      as: "reply_user",
                    },
                  },
                  {
                    $unwind: "$reply_user",
                  },
                ],
                as: "replyComment",
              },
            },
            {
              $sort: { createdAt: -1 },
            },
          ],
          totalCount: [
            {
              $match: {
                blog_id: mongoose.Types.ObjectId(
                  req.params.id
                ),
                comment_root: { $exists: false },
                reply_user: { $exists: false },
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
    const comments = data[0].totalData;
    const count = data[0].count;
    res.status(200).json({ comments, count });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const replyComment = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return res.status(401).json({
        message: "Please login to comment",
      });

    const {
      blog_id,
      blog_user_id,
      comment_root,
      reply_user,
      content,
    } = req.body;
    console.log(reply_user);
    const newComment = await Comment.create({
      user: user._id,
      blog_id,
      blog_user_id,
      comment_root,
      reply_user: reply_user._id,
      content,
    });

    await Comment.findOneAndUpdate(
      { _id: comment_root },
      {
        $push: { replyComment: newComment },
      }
    );

    const replyComment = {
      ...newComment._doc,
      user: req.user,
      reply_user,
    };

    myModule.io
      .to(blog_id)
      .emit("replyComment", replyComment);

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({
      message: err.response.data.message,
    });
  }
};

const updateComment = async (req, res) => {
  try {
    const user = req.user;
    const { data } = req.body;
    const newComment =
      await Comment.findOneAndUpdate(
        {
          _id: data._id,
          user: user._id,
        },
        {
          content: data.content,
        }
      );
    if (!newComment)
      return res
        .status(401)
        .json({ message: "Something Wrong" });

    const updateComment = {
      ...newComment._doc,
      user: req.user,
      replyComment: data.replyComment,
      content: data.content,
    };

    myModule.io
      .to(data.blog_id)
      .emit("updateComment", updateComment);

    res
      .status(201)
      .json({ message: "UpdateSuccessful!!!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const user = req.user;
    const comment =
      await Comment.findOneAndDelete({
        _id: req.params.id,
        user: user._id,
      });

    const newComment = { ...comment._doc };

    myModule.io
      .to(`${newComment.blog_id}`)
      .emit("deleteComment", newComment);

    res
      .status(201)
      .json({ message: "Delete Successful" });
  } catch (err) {
    res
      .status(500)
      .json({ message: err.message });
  }
};

module.exports = {
  createComment,
  getComments,
  replyComment,
  updateComment,
  deleteComment,
};
