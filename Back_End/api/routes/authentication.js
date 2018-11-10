const cors = require("cors");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment'); //convert String to Date
module.exports = function (application) {

    application.use(cors());

    // Route utilized to register the users
    application.post('/user/register', function (req, res) {
        let today = new Date();

        //Data object returned from api
        let appData = {
            "error": 1,
            "data": ""
        };
        
        //The lib moment convert String to Date on date format Brazil
        let dt_nasc = moment(req.body.dataNascimento, "DD/MM/YYYY").toDate();
        
        
        let hashedPassword = bcrypt.hashSync(req.body.passwd, 8)
        
        let email = req.body.email;
        let cpf = req.body.cpf;

        //Data informed from user that after it'll be load in Database
        let userData = { //Make a mapping of the data that it'll be passed by Front-End
            "nome": req.body.name,
            "sobrenome": req.body.sobName,
            "cpf": req.body.cpf,
            "telefone_celular": req.body.cel,
            "telefone_fixo": req.body.tel,
            "email": req.body.email,
            "email_alternativo": req.body.emailAlt,
            "senha": /* req.body.passwd, */ hashedPassword,
            "data_nascimento": dt_nasc, //Pass Date to object userData
            "flg_concorda_termos": req.body.checkboxTerm,
            "data_cadastro": today
        }

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
                //Check if email or CPF hasn't already been used.
                let userDAO = new application.api.models.userDAO(connection)
                userDAO.checkEmail(email, function (err, rows, fields) {
                    if (err) {
                        appData.error = 1;
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    } else {
                        if (rows.length > 0) {
                            appData.error = 1;
                            appData["data"] = "Email is already in use !";
                            res.status(403).json(appData);
                        } else {
                            userDAO.checkCPF(cpf, function (err, rows, fields) {
                                if (err) {
                                    appData.error = 1;
                                    appData["data"] = "Error Occured!";
                                    res.status(400).json(appData);
                                } else {
                                    if (rows.length > 0) {
                                        appData.error = 1;
                                        appData["data"] = "CPF is already in use !";
                                        res.status(403).json(appData);
                                    } else {
                                        userDAO.register(userData, function (err, rows, fields) {
                                            if (err) {
                                                console.log(err);
                                                appData.error = 1;
                                                appData["data"] = "Error Occured!";
                                                res.status(401).json(appData);
                                            } else {
                                                appData.error = 0;
                                                appData["data"] = "User registered successfully!";
                                                res.status(201).json(appData);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                });
                connection.release();
            }
        });
    });
    // Route utilized to login the user into the app
    application.post('/user/login', function (req, res) {

        let appData = {};
        let email = req.body.email;
        let password = req.body.password;

        //Try to get a connection on database if has error return 500 status
        let database = application.config.database()
        database.getConnection(function (err, connection) {
            if (err) {
                appData["error"] = 1;
                appData["data"] = "Internal Server Error";
                console.log(err)
                res.status(500).json(appData);
                //If connection works , do a query looking for the email requested
            } else {
                //If request has any problems with the information, return a Bad request 
                let userDAO = new application.api.models.userDAO(connection)
                userDAO.login(email, function (err, rows, fields) {
                    if (err) {
                        appData.error = 1;
                        console.log(err)
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    } else {
                        //If email is found compare the password with the email password stored and generates the JWT Token
                        if (rows.length > 0) {
                            let hashedPassword = rows[0].senha
                            if (bcrypt.compareSync(password, hashedPassword)) {
                                let jwtPayload = {}
                                    jwtPayload["id"] = rows[0].id;
                                    jwtPayload["email"] = rows[0].email;
                                let token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
                                    expiresIn: 3600
                                });
                                appData.error = 0;
                                appData["data"] = "Successful login"
                                appData["token"] = token;
                                appData["id"] = rows[0].id;

                                res.status(200).json(appData);
                            } else {
                                appData.error = 1;
                                appData["data"] = "Email and Password does not match";
                                res.status(401).json(appData);
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

    // Route utilized to register the Companies
    application.post('/company/register', function (req, res) {
        var today = new Date();

        //Data object returned from api
        var appData = {
            "error": 1,
            "data": ""
        };
        /*
        //var hashedPassword = bcrypt.hashSync(req.body.password, 8)
        */
        var email = req.body.email;
        //var city = req.body.cidades; //I need you make a select to catch the City ID before to insert 

        //Data informed from user that after it'll be load in Database
        var userData = { //Make a mapping of the data that it'll be passed by Front-End
            "data_cadastro": today, //Tab_empresa
            "nome_fantasia": req.body.name_fant, //tab_empresa
            "razao_social": req.body.raz_soc, //tab_empresa
            "cnpj": req.body.cnpj,//tab_empresa
            "telefone": req.body.tel, //Tab_contatos
            "email": req.body.email, //tab_contatos
            "senha": req.body.passwd, //???
            "flg_concorda_termos": req.body.checkboxTerm, //tab_empresa
            "cod_uf": req.body.estados, //tab_empresa
            "cod_municipio":req.body.cidades, //tab_empresa
            "endereco": req.body.endEmp //tab_empresa
        }

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
                //Check if email or CPF hasn't already been used.
                let companyDAO = new application.api.models.companyDAO(connection)
                companyDAO.checkEmail(email, function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        appData.error = 1;
                        appData["data"] = "Error Occured!";
                        res.status(400).json(appData);
                    } else {
                        if (rows.length > 0) {
                            appData.error = 1;
                            appData["data"] = "Email is already in use !";
                            res.status(403).json(appData);
                        } else {
                            companyDAO.checkCNPJ(userData.cnpj, function (err, rows, fields) {
                                if (err) {
                                    console.log(err)
                                    appData.error = 1;
                                    appData["data"] = "Error Occured!";
                                    res.status(400).json(appData);
                                } else {
                                    if (rows.length > 0) {
                                        appData.error = 1;
                                        appData["data"] = "CNPJ is already in use !";
                                        res.status(403).json(appData);
                                    } else {
                                        companyDAO.register(userData, function (err, rows, fields) {
                                            if (err) {
                                                console.log(err);
                                                appData.error = 1;
                                                appData["data"] = "Error Occured!";
                                                res.status(400).json(appData);
                                            } else {
                                                appData.error = 0;
                                                appData["data"] = "User registered successfully!";
                                                res.status(201).json(appData);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    }
                });
                connection.release();
            }
        });
    });

    // Route utilized to login the company into the app
    application.post('/company/login', function (req, res) {

        var appData = {};
        var email = req.body.emailComp;
        var password = req.body.passwordComp;

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
                let companyDAO = new application.api.models.companyDAO(connection)
                companyDAO.login(email, function (err, rows, fields) {
                    if (err) {
                        appData.error = 1;
                        appData["data"] = "Error Occured!";
                        console.log(err);
                        res.status(400).json(appData);
                    } else {
                        //If email is found compare the password with the email password stored and generates the JWT Token
                        if (rows.length > 0) {
                            if (rows[0].senha == password) {
                                let jwtPayload = {}
                                    jwtPayload["id"] = rows[0].id;
                                    jwtPayload["email"] = rows[0].email;
                                let token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {
                                    expiresIn: 3600
                                });
                                appData.error = 0;
                                appData["data"] = "Successful login"
                                appData["token"] = token;
                                appData["id"] = rows[0].id;
                                
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