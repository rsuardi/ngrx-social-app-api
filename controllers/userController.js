const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const Post = require('../model/post');
const { getMissingProps, validateEmail } = require('../util');
let { context } = require('./baseController');

module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

        try {

            // Get user input
            const { first_name, last_name, email, username, password } = req.body;

            // Validate user input
            const missingFields = getMissingProps({ first_name: first_name, last_name: last_name, email: email, username: username, password: password });
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne().or([{ 'username': username }, { 'email': email }]);

            if (oldUser) {
                return res.status(409).send({ ...context, message: `This user already exists. You may sign in` });
            }

            //Encrypt user password
            encryptedPassword = await bcrypt.hash(password, 10);

            // Create user in our database
            const user = await User.create({
                first_name,
                last_name,
                username: username.toLowerCase(), // sanitize: convert email to lowercase
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
            });

            // Create token
            const token = jwt.sign(
                { user_id: user._id, username, email },
                process.env.JWT_KEY,
                { expiresIn: "2h" }
            );
            // save user token
            user.token = token;

            // return new user
            return res.status(201).json({ ...context, message: 'User created successfully', payload: user });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {

            const users = await User.find({})
                .populate('posts', 'title body comments likes createdAt updatedAt')
                .populate('posts.comments')
                .populate('friends')
                .select('_id first_name last_name email username posts friends createdAt updatedAt');

            res.send({ ...context, success: true, message: 'Retrieved successfully', payload: { users } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = GET
    get: async (req, res) => {

        try {

            const { userId } = req.params; // this is the userid

            if (!userId) return res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const user = await User.findById(userId);

            if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

            return res.send({ ...context, success: true, message: 'Retrieved successfully', data: { user } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = PATCH
    patch: async (req, res) => {

        try {
            const { id: userId } = req.params; // this is the userid

            if (!userId) return res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            let user = await User.findById(userId);

            if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

            const { first_name, last_name, email } = req.body;

            if (email) {
                const isValidEmail = validateEmail(email);
                if (!isValidEmail) return res.status(400).send({ ...context, message: 'This is not a valid email address' });
            }

            await User.updateOne({ _id: userId })
                .set({
                    first_name: first_name || user.first_name,
                    last_name: last_name || user.last_name,
                    email: email || user.email
                });

            user = await User.findById(userId);

            return res.status(200).json({ ...context, message: 'User updated successfully', payload: user });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = DELETE
    delete: async (req, res) => {

        try {

            const { userId } = req.params;

            if (!userId) return res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const user = await User.findById(userId);

            if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

            await User.remove({ _id: userId });

            return res.status(201).json({ ...context, success: true, message: 'User deleted successfully' });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },
}