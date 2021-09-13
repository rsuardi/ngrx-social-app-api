const mongoose = require("mongoose");

const Like = new mongoose.Schema({
    value: { type: Boolean, default: false },
    relatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    relatedEntity: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'EntityType'
    }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Like", Like);