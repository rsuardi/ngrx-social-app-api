const User = require('../model/user');
const Post = require('../model/post');

let context = { success: false, message: '', data: null };

module.exports = {
    create: async (req, res) => {

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
}