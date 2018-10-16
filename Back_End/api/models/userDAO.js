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
    this._connection.query("SELECT * FROM mydatabase.tab_usuario WHERE email = ?", userData, callback)
}

userDAO.prototype.listUsers = function (callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario", callback)
}

//Select catch the address registered by user  
userDAO.prototype.getAddress = function (userData, callback){
    this._connection.query("SELECT cod_endereco, endereco FROM mydatabase.tab_endereco WHERE cod_usu_emp = (SELECT cod_usuario FROM mydatabase.tab_usuario WHERE email = ?)", userData, callback);
}


//Insert Request of Change to User
userDAO.prototype.registerRequest = function (userData, callback){
    this._connection.query("INSERT INTO mydatabase.tab_solicitacao SET ?", userData, callback);
}



module.exports = function () {
    return userDAO;
}