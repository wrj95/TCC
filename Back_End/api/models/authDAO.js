function authDAO(connection) {
    this._connection = connection ;   
}

authDAO.prototype.register = function (userData,callback) {
    this._connection.query("INSERT INTO mydatabase.tab_usuario SET ?", userData,callback)
} 

module.exports = function () {
    return authDAO;
}