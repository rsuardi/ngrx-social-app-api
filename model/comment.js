const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const Comment = new Schema({
    text: { type: String },
    refModel: {
        type: Schema.Types.ObjectId,
        required: true,
        // Instead of a hardcoded model name in `ref`, `refPath` means Mongoose
        // will look at the `onModel` property to find the right model.
        refPath: 'model'
    },
    model: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
}, { timestamps: true, versionKey: false });

Comment.add({ replies: [Comment] });

module.exports = model("Comment", Comment);