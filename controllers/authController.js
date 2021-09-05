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
                res.status(400).send({ ...context, message: "All input is required" });
            }
            // Validate if user exist in our database
            const user = await User.findOne({ username }).select('_id username password email first_name last_name');

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

                res.status(200).json({ ...context, message: 'Successfully authenticated', data: { user } });
            }
            res.status(400).send({ ...context, message: 'Invalid credentials' });
        } catch (err) {
            return res.status(500).send({ ...context, message: error.message });
        }
    },
}