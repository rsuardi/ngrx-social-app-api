
module.exports = {

    create: async (req, res) => {
        try {

        } catch (error) {

        }
    },


    getComments: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    getComment: async (req, res) => {

        try {



        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }

    },

    partiallyUpdateComment: async (req, res) => {

    },

    deleteComment: async (req, res) => {

    },

}