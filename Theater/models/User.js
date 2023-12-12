const { Schema, model } = require("mongoose");

const NAME_PATTERN = /^[a-zA-Z0-9 ]$/;

const schema = new Schema({
    // each project may have different requirements
    username: { type: String, required: true, minLength: 3},
    hashedPassword: { type: String, required: true, minLength: 3},
    likedPlays: [{type: Schema.Types.ObjectId, ref: 'Play'}]
});

module.exports = model("User", schema);
