const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Connectdb = require("./utils/Db");
const Routes = require("./routes/allroutes");



const app = express();

const corsoptions = {
    origin: "http://localhost:5173",
    methods: "GET,POST,DELETE,PUT,PATCH,HEAD",
    credentials: true
}

app.use(cors(corsoptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Routes);

app.get('/', (req, res) => {
    res.send("Hello Home");
});

Connectdb().then(() => {
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
});
