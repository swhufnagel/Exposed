const express = require("express");
const mongoose = require("mongoose");
const db = require("../models");
const cors = require("cors");
const PORT_NUMBER = process.env.PORT || 8080;
const app = express();
const mongoUri = 'mongodb+srv://swhufnagel:poopyy.1@exposeddatagroup0-s3r3z.mongodb.net/test'
const herokuUri = 'mongodb://swhufnagel:poopyy11@ds211368.mlab.com:11368/heroku_14z6qc4d'
const morgan = require("morgan");

app.use(morgan('combined'))
// Define Middleware

mongoose.connect(
    mongoUri || process.env.MONGODB_URI || herokuUri, { useNewUrlParser: true },
    function (err, db) {
        // console.log("db:", db);
        if (err) throw err;

        db.collection("userData").countDocuments(function (err, count) {
            if (err) throw err;
            app.get("/users", (req, res) => {
                db.User.find({}, async (err, doc) => {
                    res.send(doc)
                });
            })
            console.log(`Total User Rows: ${count}`);
        });

        db.collection("contacts").countDocuments(function (err, count) {
            if (err) throw err;
            console.log(`Total Contacts ${count}`);
        });
    }
);

// Routing
app.use(cors())
app.use(express.json());
app.use('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-access-token, x-user-pathway, x-mongo-key, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    next();
});

app.get("/", (req, res) => {
    res.send("Push Notification Server Running");
});
app.get("/users", (req, res) => {
    db.User.find({}, async (err, doc) => {
        res.send(doc)
    });
})
app.post("/users/create/", async (req, res) => {
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
    console.log(`Server Online cmon on Port ${PORT_NUMBER}`);
});
