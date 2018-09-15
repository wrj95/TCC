var express = require('express');
var hello = express.Router();
var database = require('../Database/database')
var cors = require("cors")
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

hello.use(cors());


// Adding Middleware wich will request the token on following function
hello.use(function (req, res, next) {
    let token = req.body.token || req.headers["token"];
    let appData = {};

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Token is invalid !";
                res.status(500).json(appData);
            } else {
                next();
            }
        });
    } else {
        appData["error"] = 1;
        appData["data"] = "Please send a token";
        res.status(403).json(appData);
    }
});


hello.get("/world", function (req, res) {
    let appData = {};
    //Try to get a connection on database if has error return 500 status
    database.connection.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            //Search the users list on DB
                res.json("Hello World")
            };
            connection.release();
        })
    });
    


module.exports = hello;