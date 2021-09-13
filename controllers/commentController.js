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

            const missingFields = getMissingProps({ text });
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            const entity = await (require('../model')[`${entityType}`].findById(entityId).populate(entityType == 'Post' ? 'comments' : 'replies'));
            if (!entity) return res.status(400).send({ ...context, message: `There's no ${entityType} matching with this value: '${entityId}'` });

            const comment = await Comment.create({
                text,
                refModel: entityId,
                model: entityType,
                commentedBy: user_id
            });
            await comment.save();

            entityType == 'Post' ? entity.comments.push(comment) : entity.replies.push(comment);
            await entity.save();

            return res.status(200).send({ ...context, message: 'Comment posted succesfully', success: true, payload: { userId: user_id, entityType, entityId, comment } });
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

            const { entityType, entityId, commentId } = req.params;

            const { user_id } = req.user;

            const relatedComment = await Comment.findOne({ _id: commentId, commentedBy: user_id, refModel: entityId, model: entityType });
            if (!relatedComment) return res.status(400).send({ ...context, message: `Not matching comment` });

            return res.status(200).json({ ...context, message: 'Retrieved successfully', payload: { relatedComment } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = PATCH
    patch: async (req, res) => {

        try {
            const { entityType, entityId, commentId } = req.params;
            const { text } = req.body;

            const missingFields = getMissingProps({ text });
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            let comment = await Comment.findOne({ _id: commentId, commentedBy: user_id, refModel: entityId, model: entityType });
            await Comment.updateOne({ _id: commentId, commentedBy: user_id, refModel: entityId, model: entityType }, { $set: { text: text || comment.text } });

            comment = await Comment.findOne({ _id: commentId, commentedBy: user_id, refModel: entityId, model: entityType });
            return res.status(200).json({ ...context, message: 'User updated successfully', payload: { comment } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = DELETE
    delete: async (req, res) => {

        try {

            const { commentId } = req.params;

            if (!commentId) return res.status(400).send({ ...context, message: 'You must provide an commentId to proceed' });

            const comment = await Comment.findById(commentId);

            if (!comment) return res.status(400).send({ ...context, message: 'This comment does not exists' });

            let user = await Posts.findById({ _id: user_id }).populate('posts');
            user.posts = user.posts.filter(x => mongoose.Types.ObjectId(x._id) == mongoose.Types.ObjectId(postId));
            await user.save();

            await Comment.deleteOne(commentId);

            return res.send({ ...context, success: true, message: 'Comment deleted', payload: { deleted_comment: comment } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

}