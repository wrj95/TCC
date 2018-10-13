$(document).ready(function(){

    //Event on Date
    $('#data').datepicker({
        dateFormat: 'dd/mm/yy', //Format Brazilian Date
        minDate: 0 //Block choice of previous days
    });

    //Event on button
    $('#btnConfirmar').click(function(e){
        $('#formRequest').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                titSolicitacao:{required: true}, //Nome da Solicitacao nao pode ser vazio
                endOrigem:{required: true}, //Endereco de origem obrigatori
                endDestino:{required: true}, //Nao aceita o campo CPF vazio
                data:{required: true}, //Nao aceita o campo Telefone vazio   
                hora:{required: true}, //Nao aceita o campo Email vazio
                valorestimado:{required: true}, //Nao aceita o campo Email Alternativo vazio
                desSolicitacao:{required: true}, //Nao aceita o campo Senha do Endereco vazio
            },
            messages: {
                titSolicitacao:{required: 'Campo Obrigatório'},
                endOrigem:{required: 'Campo Obrigatório'},
                endDestino:{required: 'Campo Obrigatório'},
                data:{required: 'Campo Obrigatório'},
                hora:{required: 'Campo Obrigatório'},
                valorestimado:{required: 'Campo Obrigatório'},
                desSolicitacao:{required: 'Campo Obrigatório: Informar um descritivo do tipo de material que deverá ser transportado'},
            }               
        });
    });
});