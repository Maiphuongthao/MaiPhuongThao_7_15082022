const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

///////////CREATE COMMENT///////////////////

exports.createComment = (req, res, next) => {
  debugger;
  //define instance of model
  const comment = new Comment({
    userId: req.auth.userId,
    postId: req.params.postId,
    content: req.body.content,
  });

  //save the instance to db
  comment
    .save()
    .then((newComment) => {
      Post.findByIdAndUpdate(
        { _id: newComment.postId },
        {
          $push: {
            comments: newComment._id,
          },
        },
        { new: true, setDefaultsOnInsert: true, upsert: true }
      )
        .then(() =>
          res.status(201).json(hateoasLinks(req, newComment, newComment._id))
        )
        .catch((error) => res.status(400).send(error));
    })

    .catch((error) => {
      res.status(400).json({ error });
    });
};

/////////////////////UPDATE COMMENT//////////////////////
exports.updateComment = (req, res, next) => {
  //get comment id
  Comment.findById(req.params.id).then((comment) => {
    if (comment.userId !== req.auth.userId) {
      res.status(403).json({ error: new Error("Unauthorized request!") });
    } else {
      Comment.findByIdAndUpdate(
        req.params.id,
        { content: req.body.content },
        { new: true, setDefaultsOnInsert: true, updert: true }
      )
        .then((commentUpdated) => {
          res
            .status(200)
            .json(hateoasLinks(req, commentUpdated, commentUpdated._id));
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  });
};

////////////////DELETE COMMENT//////////////////////////
//Check the post to find comment id parameter
//Once post is found, update it by pulling out the comment id and return it with the post updated
//One the comment is pulled from the post, seach for its id and delete it
exports.deleteComment = (req, res, next) => {
  Post.findOneAndUpdate(
    { comments: req.params.id },
    { $pull: { comments: req.params.id } },
    { new: true, setDefaultsOnInsert: true, updert: true }
  )
    .then(() => {
      Comment.findByIdAndDelete({ _id: req.params.id })
        .then((comment) => {
          if (comment.userId !== req.auth.userId) {
            res.status(403).json({ message: "Unauthorized request" });
          }
          return res.status(204).json();
        })
        .catch((error)=>res.status(400).json(error));
    })
};

const hateoasLinks = (req, comment, id) => {
  const hateoas = [
    {
      href: `${req.protocol}://${req.get("host") + "/api/post/comment" + id}`,
      rel: "readOne",
      type: "GET",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/post/comment"}`,
      rel: "readALl",
      type: "GET",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/post/comment"}`,
      rel: "create",
      type: "POST",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/post/comment" + id}`,
      rel: "update",
      type: "PUT",
    },
    {
      href: `${req.protocol}://${req.get("host") + "/api/post/comment" + id}`,
      rel: "delete",
      type: "DELETE",
    },
  ];

  return {
    ...comment.toObject(),
    links: hateoas,
  };
};
