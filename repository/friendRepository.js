const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
const Post = require('../model/post');
const { getMissingProps } = require('../util');
let { context } = require('./baseRepository');


module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

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

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {

            try {

                const { id } = req.query; // this is the userid

                if (!id) res.status(400).send({ ...context, message: 'You must provide an userid to proceed' });

                const user = await User.findById(id).populate('friends');

                if (!user) res.status(400).send({ ...context, message: 'This user does not exists' });

                res.send({ ...context, success: true, message: 'Retrieved successfully', data: { friends: user.friends } });

            } catch (error) {
                return res.status(500).send({ ...context, message: error.message });
            }

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    get: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = PATCH
    patch: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = DELETE
    delete: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },
}