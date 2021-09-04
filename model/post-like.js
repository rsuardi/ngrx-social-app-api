const mongoose = require("mongoose");

const postLikeSchema = new mongoose.Schema({
    value: { type: Boolean },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    relatedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, { timestamps: true });

module.exports = mongoose.model("PostLikes", postLikeSchema);