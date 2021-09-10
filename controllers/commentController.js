const { Post, Comment } = require('../model');
const { getMissingProps } = require('../util');
let { context } = require('./baseController');
const mongoose = require("mongoose");

module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

        try {

            const { user_id } = req.user; // this is the userid

            const { entityId } = req.params;

            const { text } = req.body;

            const missingFields = getMissingProps({ text });
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            let post = await Post.findById(entityId).populate('comments');

            const comment = await Comment.create({
                text,
                commentedBy: user_id
            });
            await comment.save();

            post.comments.push(comment);
            await post.save();

            return res.status(200).send({ ...context, message: 'Comment posted succesfully', success: true, payload: { user_id, post_id: post._id, comment } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {

            const { entityId } = req.params;

            const { user_id } = req.user;

            return res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = GET
    get: async (req, res) => {

        try {


            return res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = PATCH
    patch: async (req, res) => {

        try {


            return res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = DELETE
    delete: async (req, res) => {

        try {

            return res.status(201).json({});

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

}