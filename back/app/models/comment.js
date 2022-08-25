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

    imageUrl:{
      type:String,
    },

    content: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    likes: { type: Number, default: 0 },

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
