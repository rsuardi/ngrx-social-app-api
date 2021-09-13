const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../model/user');
let { context } = require('./baseController');

module.exports = {

    //HTTP METHOD USED = POST
    authenticate: async (req, res) => {
        try {


            // Get user input
            const { username, password } = req.body;

            // Validate user input
            if (!(username && password)) {
                return res.status(400).send({ ...context, message: "All input is required" });
            }
            // Validate if user exist in our database
            let user = await User.findOne({ username }).select('_id username password email first_name last_name');
            user = user.toObject();

            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user._id, username },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2h",
                    }
                );

                // save user token
                user.token = token;
                delete user['password'];
                return res.status(200).send({ ...context, success: true, message: 'Successfully authenticated', payload: { user } });
            }
            return res.status(400).send({ ...context, message: 'Invalid credentials' });
        } catch (error) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },
}