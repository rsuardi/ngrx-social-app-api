const jwt = require("jsonwebtoken");
let { context } = require('../controllers/baseController');

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ ...context, message: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send({ ...context, message: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;