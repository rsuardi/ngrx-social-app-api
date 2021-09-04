const mongoose = require("mongoose");

const commentReplySchema = new mongoose.Schema({
    text: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }]
}, { timestamps: true });

module.exports = mongoose.model("CommentReply", commentReplySchema);