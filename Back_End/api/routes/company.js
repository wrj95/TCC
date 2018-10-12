module.exports = function (application) {

    application.get("/company/getCompany", function (req, res) {
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
                connection.query("SELECT * FROM users", function (err, rows, fields) {
                    if (!err) {
                        appData["error"] = 0;
                        appData["data"] = rows;
                        res.status(200).json(appData);
                    } else {
                        appData["data"] = "No data found";
                        res.status(204).json(appData);
                    }
                });
                connection.release();
            }
        });
    });



}
