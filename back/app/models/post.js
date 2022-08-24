const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    imageUrl: {
      type: String,
    },
    likes: { type: Number, default: 0 },
    usersLiked: [
      {
        type: String,
        ref: "User",
      },
    ],
    comments: [
      {
        type: String,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
