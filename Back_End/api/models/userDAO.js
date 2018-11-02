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
    this._connection.query("SELECT cod_usuario AS id, senha, email FROM tab_usuario WHERE email = ?", userData, callback)
}

userDAO.prototype.listUsers = function (callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_usuario", callback)
}

//Select catch the address registered by user  
userDAO.prototype.getAddress = function (userData, callback){
    this._connection.query("SELECT cod_endereco, endereco FROM mydatabase.tab_endereco WHERE cod_usu_emp = ?", userData, callback);
}


//Insert Request of Change to User
userDAO.prototype.registerRequest = function (userData, callback){
    this._connection.query("INSERT INTO mydatabase.tab_solicitacao SET ?", userData, callback);
}

//Catch the answer
userDAO.prototype.getAnswer = function (userData, callback){
    this._connection.query("SELECT o.cod_orcamento AS idorcamento, s.tit_solicitacao AS tituloSolicitacao, e.nome_fantasia AS empresa, o.titorcamento AS tituloOrcamento, "
                            + "IF(o.empacotador='S','Com Empacotador','Sem Empacotador') AS empacotador, IF(o.seguro='S','Tem Seguro','Sem Seguro') AS seguro, "
                            + "Format(o.valor,2) AS valor, o.status AS status, DATE_FORMAT(o.data_cadastro, '%d/%m/%Y') AS data "
                            + "FROM tab_orcamento o "
                            + "INNER JOIN tab_solicitacao s ON s.cod_solicitacao = o.cod_solicitacao "
                            + "INNER JOIN tab_usuario u ON u.cod_usuario = s.cod_usuario "
                            + "INNER JOIN tab_empresa e ON e.cod_empresa = o.cod_empresa "
                            + "WHERE o.cod_solicitacao IN (SELECT cod_solicitacao "
                            + "FROM mydatabase.tab_solicitacao " 
                            + "WHERE cod_usuario = ?) "
                            + "ORDER BY o.data_cadastro DESC", userData, callback);
}

userDAO.prototype.getDetails = function (userData, callback){
    this._connection.query("SELECT o.cod_orcamento, o.titorcamento AS tituloOrcamento, o.des_orcamento AS descricao, "
                            + "o.tempo_execucao AS tempoMudanca, o.cod_empresa, e.nome_fantasia AS empresa, s.cod_solicitacao, "
                            + "s.tit_solicitacao AS tituloSolicitacao, s.des_solicitacao AS SolicitDescricao, "
                            + "IF(o.empacotador='S','Com Empacotador','Sem Empacotador') AS empacotador, IF(o.seguro='S','Tem Seguro','Sem Seguro') AS seguro, "
                            + "Format(o.valor,2) AS valor, o.status AS status, DATE_FORMAT(o.data_cadastro, '%d/%m/%Y') AS data "
                            + "FROM tab_orcamento o "
                            + "INNER JOIN tab_solicitacao s ON s.cod_solicitacao = o.cod_solicitacao "
                            + "INNER JOIN tab_usuario u ON u.cod_usuario = s.cod_usuario "
                            + "INNER JOIN tab_empresa e ON e.cod_empresa = o.cod_empresa "
                            + "WHERE o.cod_orcamento = ? "
                            + "ORDER BY o.data_cadastro DESC", userData, callback);
}

userDAO.prototype.Approve = function(userData, callback){
    this._connection.query("INSERT INTO mydatabase.tab_orcamento_aprovado SET ?", userData, callback);
}

module.exports = function () {
    return userDAO;
}