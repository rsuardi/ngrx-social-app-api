const User = require('../model/user');
const Post = require('../model/post');
let { context } = require('./baseRepository');

module.exports = {

    save: async (req, res) => {

        try {

            const { id } = req.query; // this is the userid

            if (!id) res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const userById = await User.findById(id);

            if (!userById) res.status(400).send({ ...context, message: 'This user does not exists' });

            const { title, body } = req.body;

            if (!title || !body) res.status(400).send({ ...context, message: 'This userid does not exists' });

            const post = await Post.create({
                title,
                body,
                user: id
            });
            await post.save();

            userById.posts.push(post);
            await userById.save();

            return res.status(200).send({ ...context, message: 'Post created succesfully', success: true, data: { userId: id, post } });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },


    getAll: async (req, res) => {

        try {

            const { postId } = req.query; // this is the postId

            if (!id) res.status(400).send({ ...context, message: 'You must provide an postId to proceed' });

            const post = Post.findById(postId);

            if (!post) res.status(400).send({ ...context, message: 'This post does not exists' });

            res.send({ ...context, success: true, message: 'Retrieved successfully', data: { post } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    get: async (req, res) => {

        try {

            const { id } = req.query; // this is the userid

            if (!id) res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const user = await User.findById(id).populate('posts');

            if (!user) res.status(400).send({ ...context, message: 'This user does not exists' });

            res.send({ ...context, success: true, message: 'Retrieved successfully', data: { posts: user.posts } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    patch: async (req, res) => {

    },

    delete: async (req, res) => {

    },
}