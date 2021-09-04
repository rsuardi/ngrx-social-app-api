const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    entity: { type: String } // this can be either a post or a comment, we're using the entity to say relate a like from the user
}, { timestamps: true });

module.exports = mongoose.model("Friend", friendSchema);