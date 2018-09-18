function AuthDAO(connection) {
    this._connection = connection ;   
}

AuthDAO.prototype.register = function (callback) {
    this._connection.query("INSERT INTO mydatabase.tab_usuario SET ?", userData,callback)
} 