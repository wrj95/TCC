function companyDAO(connection) {
    this._connection = connection;
}

companyDAO.prototype.checkEmail = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_empresa WHERE email = ?", userData, callback)
}

companyDAO.prototype.checkCNPJ = function (userData, callback) {
    this._connection.query("SELECT * FROM mydatabase.tab_empresa WHERE cnpj = ?", userData, callback)
}

companyDAO.prototype.register = function (userData, callback) {
    this._connection.query("INSERT INTO mydatabase.tab_empresa SET ?", userData, callback)
}
    
companyDAO.prototype.login = function (userData, callback) {
    this._connection.query("SELECT cod_empresa AS id, senha, email FROM tab_empresa WHERE email = ?", userData, callback)
}

companyDAO.prototype.listOrcamentos = function (userData, callback) {
    this._connection.query("SELECT o.cod_orcamento, o.titorcamento, s.tit_solicitacao, o.status "
                            + "FROM tab_orcamento o "
                            + "INNER JOIN tab_solicitacao s ON s.cod_solicitacao = o.cod_solicitacao "
                            + "WHERE cod_empresa = ?", userData, callback);
}

companyDAO.prototype.detailsOrcamento = function (userData, callback) {
    this._connection.query("SELECT o.titorcamento, s.tit_solicitacao, CONCAT(u.nome, ' ', u.sobrenome) AS nome_completo, "
                            + "ufo.des_uf AS uf_origem, muno.des_municipio AS mun_origem, "
                            + "CONCAT(eo.endereco ,  ', ' , eo.numero, ' - ', eo.complemento) AS end_origem_completo, "
                            + "ufd.des_uf AS uf_destino, mund.des_municipio AS mun_destino, "
                            + "CONCAT(ed.endereco,', ', ed.numero, ' - ', ed.complemento) AS end_destino_completo, "
                            + "o.valor, o.status, o.des_orcamento, o.tempo_execucao, FORMAT(o.valor,2) AS valor, "
                            + "IF(o.empacotador='S','Com Empacotador','Sem Empacotador'), IF(o.seguro='S','Tem Seguro','Sem Seguro') "
                            + "FROM tab_orcamento o "
                            + "INNER JOIN tab_solicitacao s ON s.cod_solicitacao = o.cod_solicitacao "
                            + "LEFT JOIN tab_endereco eo ON eo.cod_usu_emp = s.cod_usuario AND eo.flg_usu_emp = 'U'  AND eo.cod_endereco = s.cod_endereco_origem "
                            + "INNER JOIN tab_uf ufo ON ufo.cod_uf = eo.cod_uf "
                            + "INNER JOIN tab_municipio muno ON muno.cod_municipio = eo.cod_municipio "
                            + "LEFT JOIN tab_endereco ed ON ed.cod_usu_emp = s.cod_usuario AND ed.flg_usu_emp = 'U' AND ed.cod_endereco = s.cod_endereco_destino "
                            + "INNER JOIN tab_uf ufd ON ufd.cod_uf = ed.cod_uf "
                            + "INNER JOIN tab_municipio mund ON mund.cod_municipio = ed.cod_municipio "
                            + "INNER JOIN tab_usuario u ON u.cod_usuario = s.cod_usuario "
                            + "WHERE cod_orcamento = ?;", userData, callback);
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

//Details about Request
companyDAO.prototype.getApprove = function (userData, callback){
    this._connection.query("SELECT a.cod_orcamento_aprovado, u.nome AS Solicitante, s.tit_solicitacao AS tituloSolicitacao, "
                            + "o.titorcamento AS tituloOrcamento, o.valor AS valorAcordado "
                            + "FROM tab_orcamento_aprovado a "
                            + "INNER JOIN tab_usuario u ON a.cod_usuario = u.cod_usuario "
                            + "INNER JOIN tab_solicitacao s ON a.cod_solicitacao = s.cod_solicitacao "
                            + "INNER JOIN tab_orcamento o ON a.cod_orcamento = o.cod_orcamento "
                            + "WHERE a.cod_empresa = ?", userData, callback); //I need to do an Inner Join
}

//Details about Request
companyDAO.prototype.ApproveDetails = function (userData, callback){
    this._connection.query("SELECT CONCAT(u.nome, ' ', u.sobrenome) AS solicitante, u.email AS email, u.telefone_fixo, u.telefone_celular, "
                            + "DATE_FORMAT(s.data_servico, '%d/%m/%Y') AS data, s.hora_servico AS hora, s.des_solicitacao AS descricao, "
                            + "s.tit_solicitacao AS tituloSolicitacao, ufo.des_uf AS uf_origem, muno.des_municipio AS mun_origem, "
                            + "CONCAT(eo.endereco ,  ', ' , eo.numero, ' - ', eo.complemento) AS end_origem_completo, "
                            + "ufd.des_uf AS uf_destino, mund.des_municipio AS mun_destino, "
                            + "CONCAT(ed.endereco,', ', ed.numero, ' - ', ed.complemento) AS end_destino_completo, o.valor AS valorAcordado "
                            + "FROM tab_orcamento_aprovado a "
                            + "INNER JOIN tab_usuario u ON a.cod_usuario = u.cod_usuario "
                            + "INNER JOIN tab_solicitacao s ON a.cod_solicitacao = s.cod_solicitacao "
                            + "INNER JOIN tab_orcamento o ON a.cod_orcamento = o.cod_orcamento "
                            + "LEFT JOIN tab_endereco eo ON eo.cod_usu_emp = s.cod_usuario AND eo.flg_usu_emp = 'U' AND eo.cod_endereco = s.cod_endereco_origem "
                            + "INNER JOIN tab_uf ufo ON ufo.cod_uf = eo.cod_uf "
                            + "INNER JOIN tab_municipio muno ON muno.cod_municipio = eo.cod_municipio " 
                            + "LEFT JOIN tab_endereco ed ON ed.cod_usu_emp = s.cod_usuario AND ed.flg_usu_emp = 'U' AND ed.cod_endereco = s.cod_endereco_destino " 
                            + "INNER JOIN tab_uf ufd ON ufd.cod_uf = ed.cod_uf " 
                            + "INNER JOIN tab_municipio mund ON mund.cod_municipio = ed.cod_municipio "	
                            + "WHERE a.cod_orcamento_aprovado = ?", userData, callback); //I need to do an Inner Join
}


module.exports = function () {
    return companyDAO;
}