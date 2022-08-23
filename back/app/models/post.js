const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postId:{
        type: String,
        required: true
    },
    message:{
        type: String,
        trim : true,
        maxlength: 1000
    },
    imageUrl:{
        type: String
    },
    likes:{type: Number},
    usersLiked:[{type: String, ref: "User"}],
    comments:[{type: String, ref: "Comment"}]
},{timestamps: true})

module.exports = mongoose.model("Post", postSchema)

