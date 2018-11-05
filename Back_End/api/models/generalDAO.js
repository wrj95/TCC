function generalDAO(connection){
    this._connection = connection;
}

generalDAO.prototype.getCity = function (userData,callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_municipio WHERE cod_uf = ?", userData, callback);
}

generalDAO.prototype.getState = function (callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_uf",callback);
}

module.exports = function () {
    return generalDAO;
}