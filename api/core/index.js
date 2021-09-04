require("dotenv").config();
const express = require("express");
const auth = require("../../middleware/auth");
let router = express.Router();

const userRepository = require('../../repository/userRepository');
const friendRepository = require('../../repository/friendRepository');
const postRepository = require('../../repository/postRepository');
const postLikeRepository = require('../../repository/postLikeRepository');
const commentRepository = require('../../repository/commentRepository');
const commentLikeRepository = require('../../repository/commentLikeRepository');

module.exports = [
    //user routes
    router.post("/users", auth, userRepository.save),
    router.get("/users", auth, userRepository.getAll),
    router.get("/users/:id", auth, userRepository.get),
    router.patch("/users/:id", auth, userRepository.patch),
    router.delete("/users/:id", auth, userRepository.delete),

    //friend routes
    router.post("/user/friends", auth, friendRepository.save),
    router.get("/user/friends", auth, friendRepository.getAll),
    router.get("/user/friends/:id", auth, friendRepository.get),
    router.delete("/user/friends/:id", auth, friendRepository.delete),

    //post routes
    router.post("/user/posts", auth, postRepository.save),
    router.get("/user/posts", auth, postRepository.getAll),
    router.get("/user/posts/:id", auth, postRepository.get),
    router.patch("/user/posts/:id", auth, postRepository.patch),
    router.delete("/user/posts/:id", auth, postRepository.delete),

    //post like routes
    router.post("/user/posts/:id/likes", auth, postLikeRepository.save),
    router.get("/user/posts/:id/likes", auth, postLikeRepository.getAll),
    router.get("/user/posts/:id/likes/:id", auth, postLikeRepository.get),
    router.delete("/user/posts/:id/likes/:id", auth, postLikeRepository.delete),

    //comment routes
    router.post("/user/posts/:id/comments", auth, commentRepository.save),
    router.get("/user/posts/:id/comments", auth, commentRepository.getAll),
    router.get("/user/posts/:id/comments/:id", auth, commentRepository.get),
    router.put("/user/posts/:id/comments/:id", auth, commentRepository.update),
    router.delete("/user/posts/:id/comments/:id", auth, commentRepository.delete),

    //comment like routes
    router.post("/user/posts/:id/comments/:id/likes", auth, commentLikeRepository.save),
    router.get("/user/posts/:id/comments/:id/likes", auth, commentLikeRepository.getAll),
    router.get("/user/posts/:id/comments/:id/likes/:id", auth, commentLikeRepository.get),
    router.delete("/user/posts/:id/comments/:id/likes/:id", auth, commentLikeRepository.delete),

]