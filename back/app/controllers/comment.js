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
    const comment = new Comment({
      postId: req.auth.postId,
      userId: req.auth.userId,
      content: req.auth.content
    });
    comment
      .save()
      .then((newComment) => {
        Post.findByIdAndUpdate(newComment.postId,{
          $push:{
            comments:newComment._id
          },
          {new: true,
          setDefaultsOnInsert: true,
        upsert: true}
        })
        res.status(201).json(newComment);
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  };

  /////////////////////UPDATE COMMENT//////////////////////
  exports.updateComment = (req, res, next) => {
    //get post id
    Comment.findById(req.params.id)
    .then((comment) => {
      if (comment.userId !== req.auth.userId) {
        res.status(403).json({ error: new Error("Unauthorized request!") });
      } else {
        Comment.findByIdAndUpdate(
          { _id: req.params.id,
          content: req.body.content},
          { new: true, setDefaultsOnInsert: true, updert: true }
        )
          .then((postUpdated) => {
            res.status(200).json(postUpdated);
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
  exports.deleteComment= (req, res, next)=>{
    Post.findbyId({comments: req.params.id})
    .then((postFound)=>{
      Post.findByIdAndUpdate({_id: postFound._id},{$pull:{comment:req.params.id}},
        { new: true, setDefaultsOnInsert: true, updert: true }
        )
        .then(()=>{
          Comment.findByIdAndDelete({_id:req.param.id})
          .then((comment)=>{
            if(comment.userId !== req.auth.userId){
              res.status(403).json({message: 'Unauthorized request'})
            };
            res.status(204).send()
          })
          .catch((error).res.status(400).json(error))
        })
        .catch((error)=>res.status(400).jeson(error))
    })
    .catch((error)=>res.status(400).json(error))
  }