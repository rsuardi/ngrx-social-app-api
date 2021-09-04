require("dotenv").config();
const express = require("express");
const auth = require("../../middleware/auth");
let router = express.Router();

const userRepository = require('../../repository/userRepository');
const postRepository = require('../../repository/postRepository');
const postLikeController = require('../../repository/postLikeController');
const commentRepository = require('../../repository/commentRepository');
const commentLikeRepository = require('../../repository/commentLikeRepository');
const friendRepository = require("../../repository/friendRepository");

module.exports = [
    //user routes
    router.post("/users", auth, userRepository.create),
    router.get("/users", auth, userRepository.getUsers),
    router.get("/users/:id", auth, userRepository.getUser),
    router.patch("/users/:id", auth, userRepository.partiallyUpdateUser),
    router.delete("/users/:id", auth, userRepository.deleteUser),

    //post routes
    router.post("/user/posts", auth, postRepository.create),
    router.get("/user/posts", auth, postRepository.getPosts),
    router.get("/user/posts/:id", auth, postRepository.getPost),
    router.patch("/user/posts/:id", auth, postRepository.partiallyUpdatePost),
    router.delete("/user/posts/:id", auth, postRepository.deletePost),

    //post like routes
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),

    //comment routes
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),

    //comment like routes
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),
    // router.post("/user", auth, () => { }),

    //friend routes
    router.post("/user/friends", auth, friendRepository.create),
    router.get("/user/friends", auth, friendRepository.getFriends),
    router.get("/user/friends/:id", auth, friendRepository.getFriend),
    //router.patch("/user/friends/:id", auth, friendRepository.partiallyUpdateFriend),
    router.delete("/user/friends/:id", auth, () => friendRepository.deleteFriend),
]