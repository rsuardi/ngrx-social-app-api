const mongoose = require("mongoose");

const Comment = new mongoose.Schema({
    text: { type: String },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
}, { timestamps: true });

Comment.add({ replies: [Comment] });

module.exports = mongoose.model("Comment", Comment);