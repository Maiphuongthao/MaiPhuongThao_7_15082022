const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/", auth, commentCtrl.readAllComments);
router.get("/:id", auth, commentCtrl.readOneComment);
router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.updateComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
