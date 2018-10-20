const dotenv = require('dotenv');
dotenv.config()
const port = process.env.PORT || 3050;
const app = require('./config/server')

app.listen(port, function () {
    console.log("Server is running on port: " + port);
});