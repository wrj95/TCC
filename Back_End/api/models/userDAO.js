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

userDAO.prototype.listSolicitacao = function (userData, callback) {
    this._connection.query("SELECT cod_solicitacao, tit_solicitacao, IF(status='A','Aberto','Fechado') AS status FROM tab_solicitacao WHERE cod_usuario = ?", userData, callback)
}

userDAO.prototype.detailsSolicitacao = function (userData, callback) {
    this._connection.query("SELECT s.tit_solicitacao, ufo.des_uf AS uf_origem, muno.des_municipio AS mun_origem, " 
                            + "CONCAT(eo.endereco ,  ', ' , eo.numero, ' - ', eo.complemento) AS end_origem_completo, ufd.des_uf AS uf_destino, "
                            + "mund.des_municipio AS mun_destino, CONCAT(ed.endereco,', ', ed.numero, ' - ', ed.complemento) AS end_destino_completo, "
                            + "DATE_FORMAT(s.data_servico, '%d/%m/%Y') AS data, s.hora_servico AS hora, s.des_solicitacao AS descricao, "
                            + "CONCAT('R$ ', Format(s.vlr_estimado_carga,2)) AS valor, IF(s.status='A','Aberto','Fechado') AS status " 
                            + "FROM tab_solicitacao s " 
                            + "INNER JOIN tab_usuario u ON u.cod_usuario = s.cod_usuario "
                            + "LEFT JOIN tab_endereco eo ON eo.cod_usu_emp = s.cod_usuario AND eo.flg_usu_emp = 'U' AND eo.cod_endereco = s.cod_endereco_origem "
                            + "INNER JOIN tab_uf ufo ON ufo.cod_uf = eo.cod_uf "
                            + "INNER JOIN tab_municipio muno ON muno.cod_municipio = eo.cod_municipio "
                            + "LEFT JOIN tab_endereco ed ON ed.cod_usu_emp = s.cod_usuario AND ed.flg_usu_emp = 'U' AND ed.cod_endereco = s.cod_endereco_destino "
                            + "INNER JOIN tab_uf ufd ON ufd.cod_uf = ed.cod_uf "
                            + "INNER JOIN tab_municipio mund ON mund.cod_municipio = ed.cod_municipio "
                            + "WHERE s.cod_solicitacao = ?", userData, callback)
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
                            + "CONCAT('R$ ', Format(o.valor,2)) AS valor, DATE_FORMAT(o.data_cadastro, '%d/%m/%Y') AS data "
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
                            + "CONCAT('R$ ', Format(o.valor,2)) AS valor, DATE_FORMAT(o.data_cadastro, '%d/%m/%Y') AS data "
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

userDAO.prototype.updateStatusSolicitacao = function(userData, callback){
    this._connection.query("UPDATE mydatabase.tab_solicitacao SET status = 'F' WHERE cod_solicitacao = ?", userData, callback);
}

userDAO.prototype.updateStatusOrcamento= function(userData, callback){
    this._connection.query("UPDATE mydatabase.tab_orcamento SET status = 'F' WHERE cod_orcamento = ?", userData, callback);
}

userDAO.prototype.registerAddress = function(userData, callback){
    this._connection.query("INSERT INTO mydatabase.tab_endereco SET ?", userData, callback);
}

module.exports = function () {
    return userDAO;
}