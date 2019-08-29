import express from "express";
import Expo from "expo-server-sdk";

const mongoose = require("mongoose");
// const routes = require("../routes");
const PORT_NUMBER = 3000;
const app = express();
const expo = new Expo();

// Define Middleware

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exposed");

// Routing
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Push Notification Server Running");
});

app.listen(PORT_NUMBER, () => {
    console.log(`Server Online on Port ${PORT_NUMBER}`);
});
