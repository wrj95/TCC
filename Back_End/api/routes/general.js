module.exports = function (application) {

application.get("/lista/cidades"),
    function (req, res) {
        let appData = {};

        let database = application.config.database()
        database.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                let generalDAO = new application.api.models.generalDAO(connection)
                generalDAO.getCity(id, function (err, rows, fields) {
                    if (!err) {
                        appData["error"] = 0;
                        appData["data"] = rows;
                        res.send("Tela com as cidades", {
                            cities: rows,
                            id: id
                        });
                    } else {
                        appData["data"] = "No data found";
                        console.log(err)
                        res.status(404).json(appData);
                    }
                });
                connection.release();
            }
        })

    }

application.get("/lista/estados"),
    function (req, res) {
        let appData = {};

        let database = application.config.database()
        database.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                let generalDAO = new application.api.models.generalDAO(connection)
                generalDAO.getState(id, function (err, rows, fields) {
                    if (!err) {
                        appData["error"] = 0;
                        appData["data"] = rows;
                        res.send("Tela com as cidades", {
                            cities: rows,
                            id: id
                        });
                    } else {
                        appData["data"] = "No data found";
                        console.log(err)
                        res.status(404).json(appData);
                    }
                });
                connection.release();
            }
        })

    }
}