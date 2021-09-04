const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: { type: String },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentLikes'
    }],
    // replies: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment'
    // }]
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);