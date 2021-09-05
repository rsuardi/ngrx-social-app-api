const mongoose = require("mongoose");
const { validateEmail } = require('../util');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        default: null,
        required: 'First name is required',
    },
    last_name: {
        type: String,
        default: null,
        required: 'Last name is required',
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    username: {
        type: String,
        unique: true,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Username is required',

    },
    password: { type: String, required: 'Password is required', },
    token: { type: String },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);