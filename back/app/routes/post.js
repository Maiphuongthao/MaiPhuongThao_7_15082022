const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

require("dotenv").config();
const fs = require("fs");

//////////////READ ONE POST/////////////////////
exports.readOnePost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (req.body.imageUrl) {
        post.imageUrl = `${req.protocol}://${req.get("host")}${post.imageUrl}`;
      }
      res.status(200).json(post);
    })
    .catch((error) =>
      res.status(404).json({
        error,
      })
    );
};

///////////////READ ALL POSTS/////////////////////////

exports.readAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      posts = posts.map((post) => {
        post.imageUrl = `${req.protocol}://${req.get("host")}${post.imageUrl}`;
        return { ...post.toObject() }; // return to js object
      });
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

//////////////////CREATE ONE POST/////////////////////////:
exports.createPost = (req, res, next) => {
  //parse objet to string
  const postObject = JSON.parse(req.body.post);
  //delete the id as it'll be generate automatique
  delete postObject._id;
  //create new post
  const post = new Post({
    ...postObject,
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

///////////////////////LIKE POST/////////////////////
exports.likePost = (req, res, next) => {
  //find post id
  Post.findOne({ _id: req.params.id })
    .then((postFound) => {
      const userLikedPost = postFound.usersLiked.includes(req.auth.userId);
      let likeStatement = {};
      //Case like = 1/////////////////////////
      switch (req.body.like) {
        case 1:
          likeStatement = {
            $inc: { likes: 1 },
            $push: { usersLiked: req.auth.userId },
          };
          if (!userLikedPost) {
            Post.findByIdAndUpdate({ _id: req.params.id }, likeStatement, {
              new: true,
              setDefaultsOnInsert: true,
              upsert: true,
            })
              .then((postUpdated) => {
                res.status(200).json(postUpdated);
              })
              .catch((error) => res.status(400).json({ error }));
          } else {
            res.status(200).json({ message: "You already liked the post" });
          }
          break;
        //Case like = 0
        case 0:
          if (userLikedPost) {
            Post.findByIdAndUpdate(
              { _id: req.params.id },
              {
                $pull: {
                  usersLiked: req.auth.userId,
                },
                $inc: { like: -1 },
              },
              { new: true, setDefaultsOnInsert: true, upsert: true }
            )
              .then((postUpdated) => {
                res.status(200).json(postUpdated);
              })
              .catch((error) => res.status(400).json({ error }));
          } else {
            res.status(200).json({ message: " User never liked this post" });
          }
          break;
        default:
          res.status(422).json({ message: "Invalid value for like" });
      }
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
};

////////////////////UPDATE POST//////////////////////////////
exports.updatePost = (req, res, next) => {
  //get post id
  Post.findById(req.params.id).then((post) => {
    if (post.userId !== req.auth.userId) {
      res.status(403).json({ error: new Error("Unauthorized request!") });
    } else {
      //Check if image file existe or not, if yes create postObject with new img, if not only other info
      const postObject = req.file
        ? {
            ...JSON.parse(req.body.post),
            imageUrl: `/images/${req.file.filename}`,
          }
        : { ...req.body };

      const filename = post.imageUrl.split("/images/")[1];
      try {
        if (postObject.imageUrl) {
          fs.unlinkSync(`images/${filename}`);
        }
      } catch (error) {
        console.error(error);
      }
      Post.findByIdAndUpdate(
        { _id: req.params.id },
        { ...postObject, _id: req.params.id },
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

//////////////////////////DELETE POST/////////////////////////
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(403).json({ message: "Unthorized request" });
      } else {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() => {
              Comment.deleteMany({ postId: req.params.id })
                .then(() => res.status(204).send())
                .catch((error) => res.status(400).json(error));
              res.status(204).send();
            })
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
