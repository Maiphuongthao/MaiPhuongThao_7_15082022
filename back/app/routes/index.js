const express = require('express');
const router = express.Router();

const userRoutes = require('./user');
const postRoutes = require('./post');
const commentRoutes = require('./comment');

//path for routes
router.use('/auth', userRoutes);
router.use('/post', postRoutes);
router.use('/post/:postId/comment', commentRoutes);


module.exports = router;