const mongoose = require("mongoose")

const emailschema = new mongoose.Schema({
    userid:String,
    token:String,
    created_at: Date,
    expire_at:Date
})

const Verification = new mongoose.model("Verification",emailschema)

module.exports = Verification