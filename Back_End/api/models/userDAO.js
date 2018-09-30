function userDAO(connection) {
    this._connection = connection;
}

userDAO.prototype.checkEmail = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario WHERE email = ?", userData, callback)
}

userDAO.prototype.checkCPF = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario WHERE cpf = ?", userData, callback)
}

userDAO.prototype.register = function (userData, callback) {
    this._connection.query("INSERT INTO mydatabase.tab_usuario SET ?", userData, callback)
}

userDAO.prototype.login = function (userData, callback) {
    this._connection.query("SELECT * FROM users WHERE email = ?", userData, callback)
}

module.exports = function () {
    return userDAO;
}