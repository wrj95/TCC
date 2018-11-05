module.exports = function (application) {

   
application.get("/lista/cidades/:uf", function (req, res) {
        let appData = {};
        let uf = req.params.uf;
        let database = application.config.database()
        database.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                let generalDAO = new application.api.models.generalDAO(connection)
                generalDAO.getCity(uf, function (err, rows, fields) {
                    if (!err) {
                        appData["error"] = 0;
                        appData["cities"] = rows;
                        res.status(200).json(appData.cities);
                    } else {
                        appData["data"] = "No data found";
                        console.log(err)
                        res.status(404).json(appData);
                    }
                });
                connection.release();
            }
        })
    })

application.get("/lista/estados", function (req, res) {
    let appData = {};

    let database = application.config.database()
    database.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            let generalDAO = new application.api.models.generalDAO(connection)
            generalDAO.getState(function (err, rows, fields) {
                if (!err) {
                    appData["error"] = 0;
                    appData["state"] = rows;

                    res.status(200).json(appData.state);
                } else {
                    appData["data"] = "No data found";
                    console.log(err)
                    res.status(404).json(appData);
                }
            });
            connection.release();
        }
    })
})
}