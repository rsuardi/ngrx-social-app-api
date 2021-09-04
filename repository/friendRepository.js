const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const Post = require('../model/post');
const util = require('../util');

let context = { success: false, message: '', data: null };

module.exports = {

    create: async (req, res) => {

        try {

            const { id } = req.query; // this is the userid

            if (!id) res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

            const user = await User.findById(id).populate('friends');

            if (!user) res.status(400).send({ ...context, message: 'This user does not exists' });

            res.send({ ...context, success: true, message: 'friend added', data: { friends: user.friends } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    getFriends: async (req, res) => {

    },

    getFriend: async (req, res) => {

    },

    partiallyUpdateFriend: async (req, res) => {

    },

    deleteFriend: async (req, res) => {

    },
}