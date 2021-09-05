
let { context } = require('./baseController');

module.exports = {

    //HTTP METHOD USED = POST
    save: async (req, res) => {

        try {

            // const {  } = req.body;

            res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {
            res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = GET
    get: async (req, res) => {

        try {
            res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    //HTTP METHOD USED = DELETE
    delete: async (req, res) => {

        try {
            res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

}