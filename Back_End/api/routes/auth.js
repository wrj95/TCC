var cors = require("cors")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = function (application) {

application.use(cors());
    
//Secret Key used to verify the token
process.env.SECRET_KEY = "mydatabase";
    

// Route utilized to register the users
application.post(`/register`, function (req, res) {
    var today = new Date();
    //Data object returned from api
    var appData = {
        "error": 1,
        "data": ""
    };

    //var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    //Data informed from user
    var userData = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "password": req.body.password, //hashedPassword,
        "created": today
    }

       //Data informed from user that after it'll be load in Database
    //    var userData = { //Make a mapping of the data that it'll be passed by Front-End
    //        "nome": req.body.name,
    //        "sobrenome": req.body.sobName,
    //        "cpf_cnpj": req.body.cpfCnpj,
    //        "email": req.body.email,
    //        "senha": req.body.passwd, //hashedPassword,
    //        "email_alternativo": req.body.emailAlt,
    //        "telefone_fixo": req.body.tel,
    //        "telefone_celular": req.body.cel,
    //        "flg_concorda_termos": req.body.termos,
    //        "dt_nasc": req.body.dataNascimento,
    //        "data_cadastro": today
    //    }

    //Try to get a connection on database if has error return 500 status
    var database = application.config.database()
    database.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            console.log(err)
            res.status(500).json(appData);
            // If no errors do a insert on database to register the user
        } else {
            connection.query("INSERT INTO mydatabase.users SET ?", userData, function (err, rows, fields) {
                if (!err) {
                    appData.error = 0;
                    appData["data"] = "User registered successfully!";
                    res.status(201).json(appData);
                } else {
                    console.log(err)
                    appData["data"] = "Error Ocurred!";
                    res.status(400).json(appData);
                }
            });
            connection.release();
        }
    });
});
// Route utilized to login the user at app
application.post('/login', function (req, res) {

    var appData = {};
    var email = req.body.email;
    var password = req.body.password;

    //Try to get a connection on database if has error return 500 status
    var database = application.config.database()
    database.getConnection(function (err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Internal Server Error";
            res.status(500).json(appData);
            //If connection works , do a query looking for the email requested
        } else {
            //If request has any problems with the information, return a Bad request 
            connection.query('SELECT * FROM users WHERE email = ?', email, function (err, rows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "Error Occured!";
                    res.status(400).json(appData);
                } else {
                    //If email is found compare the password with the email password stored and generates the JWT Token
                    if (rows.length > 0) {
                        if (rows[0].password == password) {
                            let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                expiresIn: 1440
                            });
                            appData.error = 0;
                            appData["data"] = "Successful login"
                            appData["token"] = token;
                            res.status(200).json(appData);
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email and Password does not match";
                            res.status(404).json(appData);
                        }
                    } else {
                        appData.error = 1;
                        appData["data"] = "Email does not exists!";
                        res.status(404).json(appData);
                    }
                }
            });
            connection.release();
        }
    });
});

module.exports = function (application) {

    application.use(cors());

    //Secret Key used to verify the token
    process.env.SECRET_KEY = "mydatabase";


    // Route utilized to register the users
    application.post(`/register`, function (req, res) {
        var today = new Date();
        //Data object returned from api
        var appData = {
            "error": 1,
            "data": ""
        };

        //var hashedPassword = bcrypt.hashSync(req.body.password, 8)
        //Data informed from user
        var userData = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "password": req.body.password, //hashedPassword,
            "created": today
        }

        //Data informed from user that after it'll be load in Database
        //    var userData = { //Make a mapping of the data that it'll be passed by Front-End
        //        "nome": req.body.name,
        //        "sobrenome": req.body.sobName,
        //        "cpf_cnpj": req.body.cpfCnpj,
        //        "email": req.body.email,
        //        "senha": req.body.passwd, //hashedPassword,
        //        "email_alternativo": req.body.emailAlt,
        //        "telefone_fixo": req.body.tel,
        //        "telefone_celular": req.body.cel,
        //        "flg_concorda_termos": req.body.termos,
        //        "dt_nasc": req.body.dataNascimento,
        //        "data_cadastro": today
        //    }

        //Try to get a connection on database if has error return 500 status
        // var database = application.config.database()
        // database.getConnection(function (err, connection) {
        database.connection.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                console.log(err)
                res.status(500).json(appData);
                // If no errors do a insert on database to register the user
            } else {
                connection.query("INSERT INTO mydatabase.users SET ?", userData, function (err, rows, fields) {
                    if (!err) {
                        appData.error = 0;
                        appData["data"] = "User registered successfully!";
                        res.status(201).json(appData);
                    } else {
                        console.log(err)
                        appData["data"] = "Error Ocurred!";
                        res.status(400).json(appData);
                    }
                });
                connection.release();
            }
        });
    });
    // Route utilized to login the user at app
    application.post('/login', function (req, res) {

        var appData = {};
        var email = req.body.email;
        var password = req.body.password;

        //Try to get a connection on database if has error return 500 status
        // var database = application.config.database()
        // database.getConnection(function (err, connection) {
        database.connection.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                res.status(500).json(appData);
                //If connection works , do a query looking for the email requested
            } else {
                //If request has any problems with the information, return a Bad request 
                connection.query('SELECT * FROM users WHERE email = ?', email, function (err, rows, fields) {
                    if (err) {
                        appData.error = 1;
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    } else {
                        //If email is found compare the password with the email password stored and generates the JWT Token
                        if (rows.length > 0) {
                            if (rows[0].password == password) {
                                let token = jwt.sign(rows[0], process.env.SECRET_KEY, {
                                    expiresIn: 1440
                                });
                                appData.error = 0;
                                appData["data"] = "Successful login"
                                appData["token"] = token;
                                res.status(200).json(appData);
                            } else {
                                appData.error = 1;
                                appData["data"] = "Email and Password does not match";
                                res.status(404).json(appData);
                            }
                        } else {
                            appData.error = 1;
                            appData["data"] = "Email does not exists!";
                            res.status(404).json(appData);
                        }
                    }
                });
                connection.release();
            }
        });
    });

}

