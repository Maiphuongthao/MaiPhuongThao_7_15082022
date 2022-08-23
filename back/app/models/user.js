const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Create schema of user information
const userSchema = mongoose.Schema({
    pseudo:{type: String, required: true, unique: true, minlength: 3, maxlength: 35, trim: true },
    email:{type: String, required: true, unique: true, lowercase: true, trim: true, validate: [isEmail]},
    password:{type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
    imageUrl: {type: String, default:'/images/default_avatar.png'},
    followers: [{type: String, ref: "User", default: 0}],
    following: [{type: String, ref: "User", default: 0}],
}, {timestamps: true,})

//makesure that 2 users can't share the same email address before register
userSchema.plugin(uniqueValidator);

//export schema
module.exports = mongoose.model('User', userSchema);