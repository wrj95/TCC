var express = require('express');
var cors = require('cors');
var app = express();
var consign = require('consign');
var port = process.env.PORT || 3000;

//Loads the middlewares to parse these data format
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(cors());


consign()
    .include("./api/routes/auth.js")
    .then("./api/routes")
    .then("./config")
    .into(app)


app.listen(port, function () {
    console.log("Server is running on port: " + port);
});