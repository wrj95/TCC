function companyDAO(connection) {
    this._connection = connection;
}

companyDAO.prototype.checkEmail = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_empresa WHERE email = ?", userData, callback)
}

companyDAO.prototype.checkCNPJ = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_empresa WHERE cpf = ?", userData, callback)
}

companyDAO.prototype.register = function (userData, callback) {
    this._connection.query("INSERT INTO mydatabase.tab_empresa SET ?", userData, callback)
}

companyDAO.prototype.login = function (userData, callback) {
    this._connection.query("SELECT cod_empresa AS id, senha, email FROM tab_empresa WHERE email = ?", userData, callback)
}

companyDAO.prototype.getStates = function (userData, callback) {
    this._connection.query("SELECT cod_uf, des_uf FROM mydatabase.tab_uf", callback);
}

companyDAO.prototype.getCities = function (userData, callback) {
    this._connection.query("SELECT cod_municipio, des_municipio FROM mydatabase.tab_municipio WHERE cod_uf = ?", userData, callback);
}

//All Request to Feed of Request
companyDAO.prototype.getRequest = function (callback){
    this._connection.query("SELECT * FROM mydatabase.tab_solicitacao", callback); //I need to do an Inner Join
}

companyDAO.prototype.getRequestSelected = function (userData, callback){
    this._connection.query("SELECT * FROM mydatabase.tab_solicitacao WHERE cod_solicitacao = ?", userData, callback); //I need to do an Inner Join
}

//Insert Respond to Request made by Company User
companyDAO.prototype.registerRespond = function (userData, callback){
    this._connection.query("INSERT INTO mydatabase.tab_orcamento SET ?", userData, callback);
}

module.exports = function () {
    return companyDAO;
}