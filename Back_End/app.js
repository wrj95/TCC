var express = require('express');
var cors = require('cors');
var app = express();
var auth = require('./Config/auth');
var user =require('./Routes/users')
var hello = require('./Routes/helloWorld')
var port = process.env.PORT || 3000;

//Loads the middlewares to parse these data format
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())
app.use(cors());

//Adding to use the users route

app.use('/user', auth);

app.use('/user', user);

app.use('/hello', hello);


app.listen(port, function () {
    console.log("Server is running on port: " + port);
});