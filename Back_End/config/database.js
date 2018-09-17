var mysql = require('mysql');

//Module utilized to do db connections

function dbConnection(){
    return mysql.createPool({
        host: /* 'localhost' || */ 'mysql_app1',
        user: 'root',
        password: 'yourpassword',
        database: 'mydatabase'
    });
}

module.exports =  function () {
    return dbConnection
}; 
