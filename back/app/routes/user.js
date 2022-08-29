const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer')
const ratelimiter = require("../middleware/rate-limit.js");
const password = require('../middleware/password');

router.post('/signup', password, userCtrl.signup);
router.post('/login', ratelimiter, userCtrl.login);
router.post('/refresh', auth, userCtrl.refresh);
router.get('/logout',auth, userCtrl.logout);
router.get('/:id', auth, userCtrl.readOneUser);
router.get('/', auth, userCtrl.readUserInfo);
router.get('/export', auth, userCtrl.exportData);
router.put('/', auth, password, multer, userCtrl.updateUser);
router.delete('/', auth, userCtrl.deleteUser);

module.exports = router;
