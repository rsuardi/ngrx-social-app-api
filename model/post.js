const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
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
        ref: 'PostLikes'
    }],
    entity: { type: String } // this can be either a post or a comment, we're using the entity to say relate a like from the user
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);