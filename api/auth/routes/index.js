const express = require("express");

let router = express.Router();

const userController = require('../../../controllers/userController');
const authController = require('../../../controllers/authController');

router.post("/register", userController.save);
router.post("/authenticate", authController.authenticate);

module.exports = router;