var express = require('express');
var cors = require('cors');
var app = express();
<<<<<<< HEAD
=======
// var auth = require('./Config/auth');
var user =require('./Routes/users')
var hello = require('./Routes/helloWorld')
>>>>>>> master
var consign = require('consign');
var port = process.env.PORT || 3000;

//Loads the middlewares to parse these data format
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(cors());

//Adding to use the users route

// app.use('/user', auth);

// app.use('/user', user);

consign()
    .include("./api/routes/auth.js")
    .then("./api/routes")
    .then("./config")
    .into(app)

consign()
    .include("./Config")
    .into(app)

app.listen(port, function () {
    console.log("Server is running on port: " + port);
});