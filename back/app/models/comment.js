const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./post");

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    postId: {
      type: String,
      ref: "Post",
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    likes: { type: Number },
    usersLiked: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
