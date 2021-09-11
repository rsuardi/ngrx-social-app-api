const { Post, Comment } = require('../model');
const { getMissingProps } = require('../util');
let { context } = require('./baseController');
const mongoose = require("mongoose");

module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

        try {

            const { user_id } = req.user; // this is the userid

            const { entityType, entityId } = req.params;

            const { text } = req.body;

            if (!entityType || entityType != 'post' || entityType != 'comment') {
                return res.status(400).send({ ...context, message: `Missing entityType or incorrect value, you should enter: 'post' or 'comment'` });
            }
            const missingFields = getMissingProps({ text });
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            let entity = await (entityType == 'post' ? Post.findById(entityId).populate('comments') : Comment.findById(entityId).populate('replies'));

            const comment = await Comment.create({
                text,
                commentedBy: user_id
            });
            await comment.save();

            entityType == 'post' ? entity.comments.push(comment) : entity.replies.push(comment);
            await entity.save();

            return res.status(200).send({ ...context, message: 'Comment posted succesfully', success: true, payload: { user_id, entity_type: entityType, entity_id: entity._id, comment } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {

            const { entityType, entityId } = req.params;

            const { user_id } = req.user;

            if (!entityType || (entityType != 'post' && entityType != 'comment')) {
                return res.status(400).send({ ...context, message: `Missing entityType or incorrect value, you should enter: 'post' or 'comment'` });
            }

            const entity = await (entityType == 'post' ? Post.findById(entityId, { postedBy: user_id }).populate('comments').select('comments') : Comment.findById(entityId, { commentedBy: user_id }).populate('replies').select('replies'));

            return res.status(200).json({ ...context, message: 'Retrieved successfully', payload: { comments: entityType == 'post' ? entity.comments : entity.replies } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = GET
    get: async (req, res) => {

        try {

            // const comments = await User.findOne({ _id: user_id }, { [`${entityType == 'post' ? 'comments' : 'replies'}._id`]: entityId });
            const { entityType, entityId, commentId } = req.params;

            const { user_id } = req.user;

            if (!entityType || (entityType != 'post' && entityType != 'comment')) {
                return res.status(400).send({ ...context, message: `Missing entityType or incorrect value, you should enter: 'post' or 'comment'` });
            }

            // const relatedComment = await Post.findOne({ _id: entityId, 'comments._id': commentId });
            // const relatedComment = await Post.findOne({
            //     _id: entityId,
            //     postedBy: user_id
            // }, {
            //     "comments": {
            //         $elemMatch: {
            //             _id: commentId
            //         }
            //     }
            // });

            const relatedComment = await Post.findById(entityId).and([{ postedBy: user_id }, { 'comments._id': commentId }]).elemMatch('comments', {});

            if (!relatedComment) return res.status(400).send({ ...context, message: `This ${entityType == 'post' ? 'comment' : 'reply'} does not belong to this ${entityType == 'post' ? 'post' : 'comment'}` });

            // const entity = await (entityType == 'post' ? Post.findById(entityId, { postedBy: user_id }, { 'comments._id': commentId }).populate('comments').select('comments') : Comment.findById(entityId, { commentedBy: user_id }).populate('replies').select('replies'));

            const comment = await Comment.findById(commentId);

            return res.status(200).json({ ...context, message: 'Retrieved successfully', payload: { comment } });
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