const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const commentschema = new mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    postid: {
        type: Schema.Types.ObjectId, ref: "Post"
    },
    comment: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    created_at: Date,
    replies: [{
        rid: {
            type: mongoose.Schema.Types.ObjectId
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        from: {
            type: String
        },
        replyat: {
            type: String
        },
        comment: {
            type: String
        },
        likes: {
            type: String
        },
        created_at: {
            type: Date, default: Date.now()
        },
        updated_at: {
            type: Date, default: Date.now()
        }
    }],
    like: {
        type: String
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentschema)

module.exports = Comment