const User = require('../model/user');
const Post = require('../model/post');
const { getMissingProps } = require('../util');
let { context } = require('./baseController');

module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

        try {

            const { userId } = req.params; // this is the userid

            if (!userId) return res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const user = await User.findById(userId);

            if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

            const { title, body } = req.body;

            const missingFields = getMissingProps({ title, body });
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            const post = await Post.create({
                title,
                body,
                user: userId
            });
            await post.save();

            user.posts.push(post);
            await user.save();

            return res.status(200).send({ ...context, message: 'Post created succesfully', success: true, data: { userId: userId, post } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {

            const { userId } = req.params; // this is the postId

            if (!userId) return res.status(400).send({ ...context, message: 'You must provide an userId to proceed' });

            const user = await User.findById(userId).populate('posts', 'title body comments likes createdAt updatedAt');

            if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

            return res.send({ ...context, success: true, message: 'Retrieved successfully', payload: { posts: user.posts } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = GET
    get: async (req, res) => {

        try {

            const { userId, postId } = req.params; // this is the userid

            if (!userId) return res.status(400).send({ ...context, message: 'You must provide an userId to proceed' });

            if (!postId) return res.status(400).send({ ...context, message: 'You must provide an postId to proceed' });

            const user = await User.findById({ '_id': userId, 'posts._id': postId }).select('posts');

            if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

            return res.send({ ...context, success: true, message: 'Retrieved successfully', payload: { user } });

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