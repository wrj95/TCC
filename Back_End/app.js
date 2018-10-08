const express = require('express');
const cors = require('cors');
const app = express();
const consign = require('consign');
const dotenv = require('dotenv');


//Loads the environment variables
dotenv.config()
const port = process.env.PORT || 3050;

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
    .then("./config")
    .into(app)


app.listen(port, function () {
    console.log("Server is running on port: " + port);
});