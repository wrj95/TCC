$(document).ready(function(){

    //Event on button
    $('#btnConfirmar').click(function(e){
        $('#formContact').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                nome:{required: true}, //Nome da Solicitacao nao pode ser vazio
                sobrenome:{required: true}, //Endereco de origem obrigatori
                telefone:{required: true}, //Nao aceita o campo CPF vazio
                email:{email: true} //Nao aceita o campo Telefone vazio   
            },
            messages: {
                nome:{required: 'Campo Obrigatório'},
                sobrenome:{required: 'Campo Obrigatório'},
                telefone:{required: 'Campo Obrigatório'},
                email:{email: 'Email Inválido'}
            }               
        });
    });
});