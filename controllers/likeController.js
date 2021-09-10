const { getMissingProps } = require('../util');
let { context } = require('./baseController');

module.exports = {

    //HTTP METHOD USED = PATCH
    patch: async (req, res) => {

        try {
            return res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },

    //HTTP METHOD USED = GET
    getAll: async (req, res) => {

        try {
            return res.status(201).json({});
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },
}