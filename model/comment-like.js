const mongoose = require("mongoose");

const commentLikeSchema = new mongoose.Schema({
    value: { type: Boolean },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    relatedComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
}, { timestamps: true });

module.exports = mongoose.model("CommentLikes", commentLikeSchema);