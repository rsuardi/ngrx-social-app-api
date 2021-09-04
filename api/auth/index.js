const express = require("express");

let router = express.Router();

const userRepository = require('../../repository/userRepository');
const authRepository = require('../../repository/authRepository');

router.post("/register", userRepository.create);

router.post("/authenticate", authRepository.authenticate);

module.exports = router;