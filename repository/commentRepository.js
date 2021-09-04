let { context } = require('./baseRepository');

module.exports = {

    save: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },


    getAll: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    get: async (req, res) => {

        try {



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