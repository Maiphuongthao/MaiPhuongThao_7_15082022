const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.readAllPosts);
router.get("/:id", auth, postCtrl.readOnePost);

router.post("/:id", auth, postCtrl.likePost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
