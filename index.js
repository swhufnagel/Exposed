import express from "express";
import Expo from "expo-server-sdk";
import mongoose from "mongoose";

const db = require("./models");

const PORT_NUMBER = process.env.PORT || 8080;
const app = express();
const expo = new Expo();
const mongoUri = 'mongodb+srv://swhufnagel:poopyy.1@exposeddatagroup0-s3r3z.mongodb.net/test'
// Define Middleware

mongoose.connect(
    mongoUri, { useNewUrlParser: true },
    function (err, db) {
        // console.log("db:", db);
        if (err) throw err;

        db.collection("users").countDocuments(function (err, count) {
            if (err) throw err;
            console.log(`Total User Rows: ${count}`);
        });

        db.collection("contacts").countDocuments(function (err, count) {
            if (err) throw err;
            console.log(`Total Contacts ${count}`);
        });
    }
);

// Routing
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Push Notification Server Running");
});
app.get("/users", (req, res) => {
    db.User.find({}, async (err, doc) => {
        res.send(doc)
    });
})
app.post("/users/create", async (req, res) => {
    const userInfo = req.body;
    console.log("req.body:", userInfo);

    db.User.findOne({ sub: userInfo.sub }, async (err, doc) => {
        let response = { sucess: true, msg: "The User Created Successfully" };

        //The User doesn't exist => Add New User
        if (!doc) {
            let user = new db.User(req.body);
            let createdUser = await user.save();
        } else {
            response.msg = "The User/Email is Already Exists";
            res.json(response);
        }
        console.log("response:", response);
    });
});

app.post("/contacts/store", async (req, res) => {
    // console.log("req.body:", req.body);
    // Array for database
    let response = [];
    let contactIds = [];
    const owner = req.body[0].owner;

    for (let i = 0; i < req.body.length; i++) {
        const contactLookup = await db.Contacts.findOne({ id: req.body[i].id });
        if (contactLookup) {
            // if a contact was found
            console.log("User already exists!");
        } else {
            // if a contact was not found
            let contact = new db.Contacts(req.body[i]);
            let createdContact = await contact.save();
            response.push(createdContact);
            contactIds.push(contactLookup._id);
        }
    }
    console.log("response:", response);

    db.User.findOneAndUpdate(
        { id: owner },
        { $push: { contacts: contactIds } },
        (err, results) => {
            if (err) res.send(err);
            res.send(results);
        }
    );
});

app.listen(PORT_NUMBER, () => {
    console.log(`Server Online on Port ${PORT_NUMBER}`);
});
