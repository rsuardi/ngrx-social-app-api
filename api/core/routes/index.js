require("dotenv").config();
const express = require("express");
const auth = require("../../../middleware/auth");
let router = express.Router();

const { UserController,
    FriendController,
    PostController,
    LikeController,
    CommentController
} = require('../../../controllers');

module.exports = [
    //user routes
    router.post("/users", auth, UserController.save),
    router.get("/users", auth, UserController.getAll),
    router.get("/users/:userId", auth, UserController.get),
    router.patch("/users/:userId", auth, UserController.patch),
    router.delete("/users/:userId", auth, UserController.delete),

    //friend routes
    router.post("/friends", auth, FriendController.save),
    router.get("/friends", auth, FriendController.getAll),
    router.delete("/friends/:friendId", auth, FriendController.delete),

    //post routes
    router.post("/posts", auth, PostController.save),
    router.get("/posts", auth, PostController.getAll),
    router.get("/posts/:postId", auth, PostController.get),
    router.patch("/posts/:postId", auth, PostController.patch),
    router.delete("/posts/:postId", auth, PostController.delete),

    //like routes
    router.patch("/likes/:entityType/:entityId", auth, LikeController.patch),
    router.get("/likes/:entityType/:entityId", auth, LikeController.getAll),

    //comment routes
    router.post("/comments/:entityType/:entityId", auth, CommentController.save),
    router.get("/comments/:entityType/:entityId", auth, CommentController.getAll),
    router.get("/comments/:entityType/:entityId/:commentId", auth, CommentController.get),
    router.patch("/comments/:entityType/:entityId/:commentId", auth, CommentController.patch),
    router.delete("/comments/:entityType/:entityId/:commentId", auth, CommentController.delete),

]