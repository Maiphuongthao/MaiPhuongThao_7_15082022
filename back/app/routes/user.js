const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')
const ratelimiter = require("../middleware/rate-limit.js");

router.post('/signup', userCtrl.signup);
router.post("/login", ratelimiter, userCtrl.login);


module.exports = router;
