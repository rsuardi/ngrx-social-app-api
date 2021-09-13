const mongoose = require("mongoose");

const Post = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
    ],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Post", Post);