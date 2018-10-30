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
    this._connection.query("SELECT s.cod_solicitacao AS idsolicitacao, s.tit_solicitacao AS tit_solicitacao, u.nome AS nome, uf.des_uf AS uf_origem, mun.des_municipio AS mun_origem, "
                            + "eo.endereco As end_origem, ufs.des_uf AS uf_destino, muns.des_municipio AS mun_destino, "
                            + "ed.endereco AS end_destino, DATE_FORMAT(s.data_servico, '%d/%m/%Y') AS data, s.hora_servico AS hora, s.vlr_estimado_carga AS valor "
                            + "FROM tab_solicitacao s "
                            + "INNER JOIN tab_usuario u ON u.cod_usuario = s.cod_usuario "
                            + "LEFT JOIN tab_endereco eo ON eo.cod_usu_emp = s.cod_usuario "
                            + "AND eo.cod_endereco = s.cod_endereco_origem "
                            + "INNER JOIN tab_uf uf ON uf.cod_uf = eo.cod_uf "
                            + "INNER JOIN tab_municipio mun ON mun.cod_municipio = eo.cod_municipio "
                            + "LEFT JOIN tab_endereco ed ON ed.cod_usu_emp = s.cod_usuario "
                            + "AND ed.cod_endereco = s.cod_endereco_destino "
                            + "INNER JOIN tab_uf ufs ON ufs.cod_uf = ed.cod_uf "
                            + "INNER JOIN tab_municipio muns ON muns.cod_municipio = ed.cod_municipio "
                            + "WHERE s.status = 'A' "
                            + "ORDER BY s.data_cadastro DESC", callback); //I need to do an Inner Join
}

//Details about Request
companyDAO.prototype.getRequestSelected = function (userData, callback){
    this._connection.query("SELECT s.cod_solicitacao AS idsolicitacao, s.tit_solicitacao AS tit_solicitacao, CONCAT(u.nome, ' ', u.sobrenome) AS nome_completo, "
                            + "ufo.des_uf AS uf_origem, muno.des_municipio AS mun_origem, CONCAT(eo.endereco ,  ', ' , eo.numero, ' - ', eo.complemento) AS end_origem_completo, "
                            + "ufd.des_uf AS uf_destino, mund.des_municipio AS mun_destino, CONCAT(ed.endereco,', ', ed.numero, ' - ', ed.complemento) AS end_destino_completo, "
                            + "DATE_FORMAT(s.data_servico, '%d/%m/%Y') AS data, s.hora_servico AS hora, s.des_solicitacao AS descricao, s.vlr_estimado_carga AS valor "
                            + "FROM tab_solicitacao s "
                            + "INNER JOIN tab_usuario u ON u.cod_usuario = s.cod_usuario "
                            + "LEFT JOIN tab_endereco eo ON eo.cod_usu_emp = s.cod_usuario "
                            + "AND eo.flg_usu_emp = 'U' "
                            + "AND eo.cod_endereco = s.cod_endereco_origem "
                            + "INNER JOIN tab_uf ufo ON ufo.cod_uf = eo.cod_uf "
                            + "INNER JOIN tab_municipio muno ON muno.cod_municipio = eo.cod_municipio "
                            + "LEFT JOIN tab_endereco ed ON ed.cod_usu_emp = s.cod_usuario "
                            + "AND ed.flg_usu_emp = 'U' "
                            + "AND ed.cod_endereco = s.cod_endereco_destino "
                            + "INNER JOIN tab_uf ufd ON ufd.cod_uf = ed.cod_uf "
                            + "INNER JOIN tab_municipio mund ON mund.cod_municipio = ed.cod_municipio "
                            + "WHERE s.cod_solicitacao = ?", userData, callback); //I need to do an Inner Join
}

//Insert Respond to Request made by Company User
companyDAO.prototype.registerRespond = function (userData, callback){
    this._connection.query("INSERT INTO mydatabase.tab_orcamento SET ?", userData, callback);
}

module.exports = function () {
    return companyDAO;
}