$(document).ready(function(){

    //Catch the ID user
    var url = window.location.href;
    idUSer = url.split('/')[5];
    alert(idUSer);
    
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
            },
            submitHandler: function(form){
                //Aqui pega o formulário e o converte em JSON
                var json = JSON.parse(JSON.stringify(jQuery('#formRequest').serializeArray()));
                
                //Abro uma conexão com o outro servidor, do tipo Post, passo a URL da API, 
                $.post({
                    type: 'POST', //Tipo de Conexao
                    url: 'http://10.1.0.102:3050/user/login', //URL da API
                    dataType: 'json', //Tipo de dado que sera transferido
                    data: json, //Enviando o formulario em formato JSON
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8', //Envio em URLEncoded
                    success: function(data) {
                        //Pega o valor que foi setado no campo Email 
                        var email = document.getElementById('email').value;

                        //Redirecionando para a página no Back-End
                        window.location.href = 'http://10.1.0.102:3050/user/orcamento/solicitacao/' + email;
                    },
                    error: function(request, status, erro){
                        //Captando o erro retornado da API
                        var erroJ = JSON.parse(request.responseText);

                        //Se o erro for igual a "Email and Password does not match", significa que Email e Senha Incorretos
                        if(erroJ.data === "Email and Password does not match"){
                            alert("Email e Senha inválidos");
                        };
                        //Erro de que email nao existe
                        if(erroJ.data === "Email does not exists!"){
                            alert("Email não Cadastrado");
                        }
                    }
                }).done(function(result){

                }).fail(function(jqXHR,textStatus,errorThrown){
                });
            }  
        });
    });
});