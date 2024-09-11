require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")

const URL = process.env.MONGO_URL

const Connectdb = async ()=>{
    try {
        await mongoose.connect(URL)
        console.log("ho gya")
    } catch (error) {
        console.log("Connection failed")
    }
}

module.exports = Connectdb