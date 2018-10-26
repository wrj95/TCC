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
                let companyDAO = new application.api.models.companyDAO(connection)
                companyDAO.listUsers(function (err, rows, fields) {
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

    application.get("/company/orcamento/:id", function (req, res) {
        let appData = {}
        let id = req.params.id;
        let database = application.config.database()
        database.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                let companyDAO = new application.api.models.companyDAO(connection)
                companyDAO.getRequest(function (err, rows, fields) {
                    if(err){
                        appData["error"] = 1;
                        appData["data"] = "No Data Found";
                        res.status(500).json(appData);
                    }else{
                        res.render("company/feedOrcamento",{
                            itens: rows
                        })
                    }
                });
                connection.release();
            }
        })
    });

    application.get("/company/orcamento/emissao/:idSolicitacao/:id", function (req, res) {
        let appData = {}
        let id = req.params.id;
        let database = application.config.database()
        database.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                let companyDAO = new application.api.models.companyDAO(connection)
                companyDAO.getRequest(function (err, rows, fields) {
                    if(err){
                        appData["error"] = 1;
                        appData["data"] = "No data found";
                        res.status(500).json(appData);
                    }else{
                        res.render("company/emissao")
                    }
                });
                connection.release();
            }
        })
    });


    application.post("/company/orcamento/emissao/:id", function (req, res) {
        let appData = {}
        let id = req.params.id;
        let database = application.config.database()

        var userData = {
            //Data from Company User
        }
        database.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
            } else {
                let companyDAO = new application.api.models.companyDAO(connection)
                companyDAO.registerRespond(userData, function (err, rows, fields) {
                    if(err){
                        appData["error"] = 1;
                        appData["data"] = "Data not found"
                        res.status(401).send(appData);
                    }else{
                        appData["error"] = 1;
                        appData["data"] = "Success"
                        res.status(200).send(appData);
                    }
                });
                connection.release();
            }
        })
    });

}