const express = require("express");
const consign = require("consign");
const app = express();
const cors = require('cors');


// Definition of view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './api/views');

app.use(cors());

//Loads the middlewares to parse these data format
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())


consign()
    .include("./api/routes/authentication.js")
    .then("./config/middleware.js")
    .then("./api/routes")
    .then("./api/models")
    .then("./config/database.js")
    .into(app)

module.exports = app ;