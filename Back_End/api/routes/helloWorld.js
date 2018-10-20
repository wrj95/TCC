module.exports = function (application) {
    
application.get("/hello/world", function (req, res) {
    let appData = {};
    //Try to get a connection on database if has error return 500 status
    var database = application.config.database()
    database.getConnection(function (err, connection) {
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
    
}


// module.exports = hello;