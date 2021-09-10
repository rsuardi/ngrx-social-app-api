const mongoose = require("mongoose");

const EntityType = new mongoose.Schema({
    name: { type: String, required: 'Entity type required' },
    description: { type: String },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("EntityType", EntityType);