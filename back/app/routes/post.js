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
            res.status(200).json(post, hateoasLinks(req, post._id));
        })
        .catch((error) =>
            res.status(404).json({
                error
            })
        );
};