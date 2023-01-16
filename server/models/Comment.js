const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    blog_id: {
      type: mongoose.Types.ObjectId,
    },
    blog_user_id: {
      type: mongoose.Types.ObjectId,
    },
    replyComment: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
    reply_user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: true },
    comment_root: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },

  {
    timestamps: true,
  }
);

const Comment = mongoose.model(
  "Comment",
  CommentSchema
);

module.exports = Comment;
