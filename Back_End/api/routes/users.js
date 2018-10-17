module.exports = function (application){

application.get("/user/getUsers", function (req, res) {
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
            let userDAO = new application.api.models.userDAO(connection)
            userDAO.listUsers(function (err, rows, fields){
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


application.get("/user/orcamento/solicitacao/:email", function (req,res) {

    let appData = {};
    let email = req.params.email;
    let database = application.config.database()
    database.getConnection(function (err,connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            console.log(email)
            let userDAO = new application.api.models.userDAO(connection)
            userDAO.getAddress(email, function (err, rows, fields) {
                if (!err) {
                    appData["error"] = 0;
                    appData["data"] = rows;
                    res.render("user/solicitacao",{
                        address: rows
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
});



}
