$(document).ready(function(){

    //Event on button
    $('#btnConfirmar').click(function(e){
        $('#formRespond').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                titOrcamento:{required: true}, //Nome da Solicitacao nao pode ser vazio
                TempoTransp:{required: true}, //Endereco de origem obrigatori
                chkEmpacota:{required: true}, //Nao aceita o campo CPF vazio
                chkSeguro:{required: true}, //Nao aceita o campo Telefone vazio   
                valor:{required: true}, //Nao aceita o campo Email vazio
                desSolicitacao:{required: true} //Nao aceita o campo Email Alternativo vazio
            },
            messages: {
                titOrcamento:{required: 'Campo Obrigatório'},
                TempoTransp:{required: 'Campo Obrigatório'},
                chkEmpacota:{required: 'Campo Obrigatório'},
                chkSeguro:{required: 'Campo Obrigatório'},
                valor:{required: 'Campo Obrigatório'},
                desSolicitacao:{required: 'Campo Obrigatório: Informar um descritivo do Serviço'}
            }               
        });
    });
});