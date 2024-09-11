const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const persionalschema = new mongoose.Schema({
    profile: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Persional = mongoose.model("Persional", persionalschema)

module.exports = Persional;