const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const Post = require('../model/post');
const util = require('../util');
let { context } = require('./baseRepository');

module.exports = {

    save: async (req, res) => {

        try {

            // Validate user input
            const missingFields = util.getMissingProps(req.body);
            if (missingFields) return res.status(400).send({ ...context, message: `Missing fields: ${missingFields}` });

            // Get user input
            const { first_name, last_name, email, username, password } = req.body;

            // check if user already exist
            // Validate if user exist in our database
            const oldUser = await User.findOne({ username, email });

            if (oldUser) {
                return res.status(409).send({ ...context, message: `The user already exists. You may sign in` });
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
            res.status(201).json(user);
        } catch (err) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    getAll: async (req, res) => {

        try {

            const users = await User.find({});

            res.send({ ...context, success: true, message: 'Retrieved successfully', data: { users } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    get: async (req, res) => {

        try {

            const { id } = req.query; // this is the userid

            if (!id) res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const user = await User.findById(id);

            if (!user) res.status(400).send({ ...context, message: 'This user does not exists' });

            res.send({ ...context, success: true, message: 'Retrieved successfully', data: { user } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    getUserFriends: async (req, res) => {

        try {

            const { id } = req.query; // this is the userid

            if (!id) res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const user = await User.findById(id).populate('friends');

            if (!user) res.status(400).send({ ...context, message: 'This user does not exists' });

            res.send({ ...context, success: true, message: 'Retrieved successfully', data: { friends: user.friends } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    patch: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    delete: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },
}