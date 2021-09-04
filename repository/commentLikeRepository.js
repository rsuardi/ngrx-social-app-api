
let { context } = require('./baseRepository');

module.exports = {

    like: async (req, res) => {

        try {

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },


    getLikes: async (req, res) => {

        try {

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    getLike: async (req, res) => {

        try {

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    unlike: async (req, res) => {

        try {

        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

}