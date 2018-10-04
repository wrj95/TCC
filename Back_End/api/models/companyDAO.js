function companyDAO(connection) {
    this._connection = connection;
}

companyDAO.prototype.checkEmail = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario WHERE email = ?", userData, callback)
}

companyDAO.prototype.checkCNPJ = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario WHERE cpf = ?", userData, callback)
}

companyDAO.prototype.register = function (userData, callback) {
    this._connection.query("INSERT INTO mydatabase.tab_usuario SET ?", userData, callback)
}

module.exports = function () {
    return companyDAO;
}