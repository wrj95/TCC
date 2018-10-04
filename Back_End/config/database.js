var mysql = require('mysql');

//Module utilized to do db connections

function dbConnection(){
    return mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    });
}

module.exports =  function () {
    return dbConnection
}; 
