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


companyDAO.prototype.getStates = function (userData, callback) {
    this._connection.query("SELECT cod_uf, des_uf FROM mydatabase.tab_uf", callback);
}

companyDAO.prototype.getCities = function (userData, callback) {
    this._connection.query("SELECT cod_municipio, des_municipio FROM mydatabase.tab_municipio WHERE cod_uf = ?", userData, callback);
}

//All Request to Feed of Request
companyDAO.prototype.getRequest = function (userData, callback){
    this._connection.query("SELECT * FROM mydatabase.tab_solicitacao", callback);
}

//Insert Respond to Request made by Company User
companyDAO.prototype.registerRespond = function (userData, callback){
    this._connection.query("INSERT INTO mydatabase.tab_orcamento SET ?", userData, callback);
}

module.exports = function () {
    return companyDAO;
}