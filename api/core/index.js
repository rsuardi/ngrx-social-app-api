require("dotenv").config();
const express = require("express");
const auth = require("../../middleware/auth");
let router = express.Router();

const userController = require('../../controllers/userController');
const friendController = require('../../controllers/friendController');
const postController = require('../../controllers/postController');
const postLikeController = require('../../controllers/postLikeController');
const commentController = require('../../controllers/commentController');
const commentLikeController = require('../../controllers/commentLikeController');

module.exports = [
    //user routes
    router.post("/users", auth, userController.save),
    router.get("/users", auth, userController.getAll),
    router.get("/users/:userId", auth, userController.get),
    router.patch("/users/:userId", auth, userController.patch),
    router.delete("/users/:userId", auth, userController.delete),

    //friend routes
    router.post("/users/:userId/friends", auth, friendController.save),
    router.get("/users/:userId/friends", auth, friendController.getAll),
    router.get("/users/:userId/friends/:friendId", auth, friendController.get),
    router.delete("/users/:userId/friends/:friendId", auth, friendController.delete),

    //post routes
    router.post("/users/:userId/posts", auth, postController.save),
    router.get("/users/:userId/posts", auth, postController.getAll),
    router.get("/users/:userId/posts/:postId", auth, postController.get),
    router.patch("/users/:userId/posts/:postId", auth, postController.patch),
    router.delete("/users/:userId/posts/:postId", auth, postController.delete),

    //post like routes
    router.post("/users/:userId/posts/:postId/likes", auth, postLikeController.save),
    router.get("/users/:userId/posts/:postId/likes", auth, postLikeController.getAll),
    router.get("/users/:userId/posts/:postId/likes/:likeId", auth, postLikeController.get),
    router.delete("/users/:userId/posts/:postId/likes/:likeId", auth, postLikeController.delete),

    //comment routes
    router.post("/users/:userId/posts/:postId/comments", auth, commentController.save),
    router.get("/users/:userId/posts/:postId/comments", auth, commentController.getAll),
    router.get("/users/:userId/posts/:postId/comments/:commentId", auth, commentController.get),
    router.patch("/users/:userId/posts/:postId/comments/:commentId", auth, commentController.patch),
    router.delete("/users/:userId/posts/:postId/comments/:commentId", auth, commentController.delete),

    //comment like routes
    router.post("/users/:userId/posts/:postId/comments/:commentId/likes", auth, commentLikeController.save),
    router.get("/users/:userId/posts/:postId/comments/:commentId/likes", auth, commentLikeController.getAll),
    router.get("/users/:userId/posts/:postId/comments/:commentId/likes/:likeId", auth, commentLikeController.get),
    router.delete("/users/:userId/posts/:postId/comments/:commentId/likes/:likeId", auth, commentLikeController.delete),

]