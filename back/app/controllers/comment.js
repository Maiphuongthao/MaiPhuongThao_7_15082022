const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");


//////////////READ ONE COMMENT/////////////////////
exports.readOneComment = (req, res, next) => {
    Comment.findById(req.params.id)
      .then((comment) => {
        res.status(200).json(comment);
      })
      .catch((error) =>
        res.status(404).json({
          error,
        })
      );
  };
  

  ///////////////READ ALL POSTS/////////////////////////

exports.readAllComments = (req, res, next) => {
    Comment.find({postId: req.body.postId})
      .then((postWithComments) => {
        res.status(200).json(postWithComments);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  };



///////////CREATE COMMENT///////////////////

exports.createComment = (req, res, next) => {
    //parse objet to string
    const commentObject = JSON.parse(req.body.comment);
    //delete the id as it'll be generate automatique
    delete commentObject._id;
    //create new post
    const post = new Comment({
      ...commentObject,
      userId: req.auth.userId,
      imageUrl: req.file ? `/images/${req.file.filename}` : "",
    });
  
    post
      .save()
      .then((newPost) => {
        res.status(201).json(newPost);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };