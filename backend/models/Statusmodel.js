const mongoose = require("mongoose")

const statusschema = new mongoose.Schema({
    video: {
        type: String,
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: Boolean,
        default: false
    },
    profile: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h'
    }
})

const Status = mongoose.model("Status", statusschema)

module.exports = Status