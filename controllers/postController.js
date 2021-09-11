const { User, Post } = require('../model');
const { getMissingProps } = require('../util');
let { context } = require('./baseController');
const mongoose = require("mongoose");

module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

        try {

            const { user_id } = req.user; // this is the userid

            const { title, body } = req.body;

            const missingFields = getMissingProps({ title, body });
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            let user = await User.findById(user_id).populate('posts');

            const post = await Post.create({
                title,
                body,
                postedBy: user_id
            });
            await post.save();

            user.posts.push(post);
            await user.save();

            return res.status(200).send({ ...context, message: 'Post created succesfully', success: true, payload: { user_id, post } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {

            const { user_id } = req.user; // this is the postId

            const user = await User.findById(user_id).populate('posts', 'title body comments likes createdAt updatedAt');

            if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

            return res.send({ ...context, success: true, message: 'Retrieved successfully', payload: { posts: user.posts } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = GET
    get: async (req, res) => {

        try {

            const { postId } = req.params; // this is the userid

            const { user_id } = req.user; // this is the userid

            if (!postId) return res.status(400).send({ ...context, message: 'You must provide an postId to proceed' });

            const relatedUserPost = await User.findById({ '_id': user_id, 'posts._id': postId });

            if (!relatedUserPost) return res.status(400).send({ ...context, message: 'This post does not belong to this user' });

            const post = await Post.findById(postId);

            if (!post) return res.status(400).send({ ...context, message: 'This post exists' });

            return res.send({ ...context, success: true, message: 'Retrieved successfully', payload: { post } });

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

            const { user_id } = req.user;

            const { postId } = req.params;

            if (!postId) return res.status(400).send({ ...context, message: 'You must provide an postId to proceed' });

            const post = await Post.findById(postId);

            if (!post) return res.status(400).send({ ...context, message: 'This post does not exists' });

            let user = await User.findById({ _id: user_id }).populate('posts');
            user.posts = user.posts.filter(x => mongoose.Types.ObjectId(x._id) == mongoose.Types.ObjectId(postId));
            await user.save();

            await Post.deleteOne({ _id: mongoose.Types.ObjectId(postId) });

            return res.send({ ...context, success: true, message: 'Post deleted', payload: { deleted_post: post } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },
}