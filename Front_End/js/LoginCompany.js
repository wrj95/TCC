$(document).ready(function(){
    $('#login').click(function (e) { //Quando o botao do formulario e acionado
        $('#myform').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                emailComp:{required: true, email: true}, //Nao aceita o campo Nome vazio
                passwordComp:{required: true}, //Nao aceita o campo SobreNome vazio
            },
            messages: {
                emailComp:{required: 'Insira E-mail de Login', email: 'Email Inválido'},
                passwordComp:{required: 'Informe a Senha para Login'},
            },
            submitHandler: function(form){
                //Aqui pega o formulário e o converte em JSON
                var json = JSON.parse(JSON.stringify(jQuery('#myform').serializeArray()));
                
                //Abro uma conexão com o outro servidor, do tipo Post, passo a URL da API, 
                $.post({
                    type: 'POST', //Tipo de Conexao
                    url: 'http://10.1.0.102:3050/company/login', //URL da API
                    dataType: 'json', //Tipo de dado que sera transferido
                    data: json, //Enviando o formulario em formato JSON
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8', //Envio em URLEncoded
                    success: function(data) {
                         //??
                    },
                    error: function(request, status, erro){
                        //Captando o erro retornado da API
                        var erroJ = JSON.parse(request.responseText);

                        //Se o erro for igual a "Email and Password does not match", significa que Email e Senha Incorretos
                        if(erroJ.data === "Email and Password does not match"){
                            alert("Senha Incorreta");
                        };
                        //Erro de que email nao existe
                        if(erroJ.data === "Email does not exists!"){
                            alert("Email não Cadastrado");
                        }
                    }
                }).done(function(result){
                        //Aqui será tratada à resposta do Servidor
                }).fail(function(jqXHR,textStatus,errorThrown){
                        //alert(errorThrown);
                        //Aqui será mostrado o erro que retornará do Servidor
                });
            }                
        });
    });
})