require("dotenv").config();
const express = require("express");
const auth = require("../../middleware/auth");
let router = express.Router();

const userRepository = require('../../repository/userRepository');
const friendRepository = require("../../repository/friendRepository");
const postRepository = require('../../repository/postRepository');
const postLikeRepository = require('../../repository/postLikeRepository');
const commentRepository = require('../../repository/commentRepository');
const commentLikeRepository = require('../../repository/commentLikeRepository');

module.exports = [
    //user routes
    router.post("/users", auth, userRepository.create),
    router.get("/users", auth, userRepository.getUsers),
    router.get("/users/:id", auth, userRepository.getUser),
    router.patch("/users/:id", auth, userRepository.partiallyUpdateUser),
    router.delete("/users/:id", auth, userRepository.deleteUser),

    //friend routes
    router.post("/user/friends", auth, friendRepository.create),
    router.get("/user/friends", auth, friendRepository.getFriends),
    router.get("/user/friends/:id", auth, friendRepository.getFriend),
    router.delete("/user/friends/:id", auth, () => friendRepository.deleteFriend),

    //post routes
    router.post("/user/posts", auth, postRepository.create),
    router.get("/user/posts", auth, postRepository.getPosts),
    router.get("/user/posts/:id", auth, postRepository.getPost),
    router.patch("/user/posts/:id", auth, postRepository.partiallyUpdatePost),
    router.delete("/user/posts/:id", auth, postRepository.deletePost),

    //post like routes
    router.post("/user/posts/:id/likes", auth, postLikeRepository.like),
    router.get("/user/posts/:id/likes", auth, postLikeRepository.getLikes),
    router.get("/user/posts/:id/likes/:id", auth, postLikeRepository.getLike),
    router.put("/user/posts/:id/likes/:id", auth, postLikeRepository.unlike),

    //comment routes
    router.post("/user/posts/:id/comments", auth, commentRepository.create),
    router.get("/user/posts/:id/comments", auth, commentRepository.getComments),
    router.get("/user/posts/:id/comments/:id", auth, commentRepository.getComment),
    router.put("/user/posts/:id/comments/:id", auth, commentRepository.partiallyUpdateComment),
    router.delete("/user/posts/:id/comments/:id", auth, commentRepository.deleteComment),

    //comment like routes
    router.post("/user/posts/:id/comments/:id/likes", auth, commentLikeRepository.like),
    router.get("/user/posts/:id/comments/:id/likes", auth, commentLikeRepository.getLikes),
    router.get("/user/posts/:id/comments/:id/likes/:id", auth, commentLikeRepository.getLike),
    router.put("/user/posts/:id/comments/:id/likes/:id", auth, commentLikeRepository.unlike),

]