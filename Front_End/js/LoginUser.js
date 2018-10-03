$(document).ready(function(){
    $('#login').click(function (e) { //Quando o botao do formulario e acionado
        $('#myform').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                email:{required: true, email: true}, //Nao aceita o campo Nome vazio
                password:{required: true}, //Nao aceita o campo SobreNome vazio
            },
            messages: {
                email:{required: 'Insira E-mail de Login', email: 'Insira um email válido'},
                password:{required: 'Informe a Senha para Login'},
            },
            submitHandler: function(form){
                //Aqui pega o formulário e o converte em JSON
                var json = JSON.parse(JSON.stringify(jQuery('#myform').serializeArray()));
                
                //Abro uma conexão com o outro servidor, do tipo Post, passo a URL da API, 
                $.post({
                    type: 'POST', //Tipo de Conexao
                    url: 'http://localhost:3050/user/login', //URL da API
                    dataType: 'json', //Tipo de dado que sera transferido
                    data: json, //Enviando o formulario em formato JSON
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8', //Envio em URLEncoded
                    success: function(data) {
                         //??
                    },
                    error: function(){
                        alert('Erro')
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