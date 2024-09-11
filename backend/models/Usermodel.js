const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean, default: false
    },
    profilePicture: {
        type: String
    },
    userid: {
        type: String,
        default: () => new mongoose.Types.ObjectId()
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

userschema.methods.generatetoken = async function () {
    try {
        return jwt.sign({
            userid: this._id.toString(),
            email: this.email,
        },
            process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
    } catch (error) {
        console.error(error);
    }
};

const User = mongoose.model("User", userschema);

module.exports = User;
