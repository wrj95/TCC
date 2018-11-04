function generalDAO(connection){
    this._connection = connection ;
}

generalDAO.prototype.getCity = function (userData,callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario WHERE email = ?", userData, callback);
}

generalDAO.prototype.getState = function (userData,callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario WHERE email = ?", userData, callback);
}