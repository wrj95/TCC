var moment = require('moment');
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


application.get("/user/orcamento/solicitacao/:id", function (req,res) {

    let appData = {};
    let id = req.params.id;
    let database = application.config.database()
    database.getConnection(function (err,connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            let userDAO = new application.api.models.userDAO(connection)
            userDAO.getAddress(id, function (err, rows, fields) {
                if (!err) {
                    appData["error"] = 0;
                    appData["data"] = rows;
                    res.render("user/solicitacao",{
                        address: rows,
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
});

application.post("/user/orcamento/solicitacao/:id", function (req, res){
    let appData = {};
    let id = req.params.id;
    
    var hora = moment(req.body.hora, 'HH:mm')
    var data_hora = moment(req.body.data, "DD/MM/YYYY").format();
    var data_hora_format = data_hora.replace(':00+00:00', '')

    let valor = parseFloat(req.body.valorestimado);

    let userData = {
        "cod_usuario": id,
        "des_solicitacao": req.body.titSolicitacao,
        "cod_endereco_origem": req.body.endOrigem,
        "cod_endereco_destino": req.body.endDestino,
        "valor_estimado": valor,
        "data_servico": data_hora_format.replace('T', ' '),
        "hora_servico": hora.substring(16,11)
    }
    //
    let database = application.config.database()
    database.getConnection(function (err,connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
        } else {
            let userDAO = new application.api.models.userDAO(connection)
            userDAO.registerRequest(userData, function (err, rows, fields) {
                if (err) {
                    appData["data"] = "No data found";
                    console.log(err)
                    res.status(404).json(appData);
                } else {
                    appData["data"] = "Save";
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    })
});
}
