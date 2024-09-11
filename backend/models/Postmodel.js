const mongoose = require("mongoose")

const postschema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    profile: {
        type: String,
    },
    username: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
    video: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Comment"
    }]
}, { timestamps: true })

const Post = mongoose.model("Post", postschema)

module.exports = Post