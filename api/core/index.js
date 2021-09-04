require("dotenv").config();
const express = require("express");
const auth = require("../../middleware/auth");
let router = express.Router();

const userRepository = require('../../repository/userRepository');
const postRepository = require('../../repository/postRepository');
const postLikeController = require('../../repository/postLikeController');
const commentRepository = require('../../repository/commentRepository');
const commentLikeRepository = require('../../repository/commentLikeRepository');

module.exports = [
    //user routes
    router.post("/user/create", auth, userRepository.create),
    router.get("/user/posts", auth, userRepository.getUserPosts),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),

    //post routes
    router.post("/post/create", auth, postRepository.create),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),

    //post like routes
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),

    //comment routes
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),

    //comment like routes
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
    // router.post("/sample", auth, () => { }),
]