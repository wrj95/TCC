var mysql = require('mysql');

//Module utilized to do db connections
var connection = mysql.createPool({
    host: 'localhost' || 'mysql_app',
    user: 'root',
    password: 'yourpassword',
    database: 'mydatabase'
});

//Wrapper
module.exports.connection = connection;

// module.exports = function () {
//     return connMySQL
// };

// function connMySQL() {
//     console.log(' Connection with Database was estabilished')
//     return mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'gabrieric',
//         database: 'mydatabase'
//     });
// }