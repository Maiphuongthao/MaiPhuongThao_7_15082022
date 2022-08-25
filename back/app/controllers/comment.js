const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");


//////////////READ ONE COMMENT/////////////////////
exports.readOneComment = (req, res, next) => {
    Comment.findById(req.params.id)
      .then((comment) => {
        if (req.body.imageUrl) {
          comment.imageUrl = `${req.protocol}://${req.get("host")}${comment.imageUrl}`;
        }
        res.status(200).json(comment);
      })
      .catch((error) =>
        res.status(404).json({
          error,
        })
      );
  };
  