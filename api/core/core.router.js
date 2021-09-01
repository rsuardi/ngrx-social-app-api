require("dotenv").config();
const express = require("express");
const auth = require("../../middleware/auth");
let router = express.Router();

router.post("/getFeed", auth, async (req, res) => {
    try {
        //TODO
        res.status(201).json({});
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;