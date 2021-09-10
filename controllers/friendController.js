const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { User, Post } = require('../model');
const { getMissingProps } = require('../util');
let { context } = require('./baseController');
const mongoose = require("mongoose");


module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

        try {

            const { friendId } = req.body;

            const { user_id } = req.user; // this is the userid

            if (!friendId) return res.status(400).send({ ...context, message: 'You must provide an friendId to proceed' });

            const friend = await User.findById(friendId);

            if (!friend) return res.status(400).send({ ...context, message: 'This friend does not exists' });

            const nestedFriend = await User.findOne({ 'friends._id': friendId });

            if (nestedFriend) return res.status(400).send({ ...context, message: 'This user is friends with you already' });

            let user = await User.findById(user_id).populate('friends').select('_id username email first_name last_name');

            user.friends.push(friend);

            user.save();

            return res.send({ ...context, success: true, message: 'Friend added', payload: { new_friend: friend, user } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {

            try {

                const { user_id: id } = req.user; // this is the userid

                const user = await User.findById(id).populate('friends');

                if (!user) return res.status(400).send({ ...context, message: 'This user does not exists' });

                return res.send({ ...context, success: true, message: 'Retrieved successfully', payload: { friends: user.friends } });

            } catch (error) {
                return res.status(500).send({ ...context, message: error.message });
            }

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = DELETE
    delete: async (req, res) => {

        try {

            const { user_id } = req.user;

            const { friendId } = req.params;

            if (!friendId) return res.status(400).send({ ...context, message: 'You must provide an friendId to proceed' });

            const friend = await User.findById(friendId);

            if (!friend) return res.status(400).send({ ...context, message: 'This user does not exists' });

            await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(user_id) }, { $pull: { "friends": { _id: mongoose.Types.ObjectId(friendId) } } }, { safe: true, upsert: true });

            return res.status(200).json({ ...context, message: 'Friend deleted', payload: { deleted_user: friend } });

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },
}