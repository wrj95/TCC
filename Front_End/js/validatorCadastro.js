$(document).ready(function(){

    $('#dataNascimento').mask("99/99/9999"); //Tratando o Data
    $('#tel').mask("(99)9999-9999"); //Tratando Numero de Telefone
    $('#cel').mask("(99)99999-9999"); //Tratando Numero de Celular
    $('#cpfCnpj').mask("99999999999")

    $('#cadastrar').click(function (e) { //Quando o botao do formulario e acionado
        $.validator.addMethod("dateBR", function(value, element) {
            if(value.length!=10) return false;
            // verificando data
            var data= value;
            var dia= data.substr(0,2); //Capta o dia
            var barra1= data.substr(2,1);
            var mes= data.substr(3,2); //Capta o mes
            var barra2= data.substr(5,1);
            var ano= data.substr(6,4); //Capta o ano
            if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12)return false;
            if((mes==4||mes==6||mes==9||mes==11) && dia==31)return false; //Validando meses com dia 31
            if(mes==2  &&  (dia>29||(dia==29 && ano%4!=0)))return false; //validando Fevereiro e ano bissexto
            if(ano < 1900)return false; //Ano minimo
            return true;
        }, "Informe uma data válida"); // Mensagem padrão

        $.validator.addMethod("cpf", function (value, element) {
            value = jQuery.trim(value);
            cpf = value;
            while (cpf.length < 11) cpf = "0" + cpf;
            var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
            var a = [];
            var b = new Number;
            var c = 11;
            for (i = 0; i < 11; i++) {
                a[i] = cpf.charAt(i);
                if (i < 9) b += (a[i] * --c);
            }
            if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
            b = 0;
            c = 11;
            for (y = 0; y < 10; y++) b += (a[y] * c--);
                if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }
                if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return false;
                return true;
        }, "Informe um CPF válido."); 

        $('#myform').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                name:{required: true}, //Nao aceita o campo Nome vazio
                sobName:{required: true}, //Nao aceita o campo SobreNome vazio
                cpfCnpj:{required: true, cpf: true}, //Nao aceita o campo CPF vazio
                tel:{required: true}, //Nao aceita o campo Telefone vazio   
                email:{required: true, email: true}, //Nao aceita o campo Email vazio
                emailAlt:{required: true, email: true}, //Nao aceita o campo Email Alternativo vazio
                passwd:{required: true, minlength: 3}, //Nao aceita o campo Senha do Endereco vazio
                passwdConfirm:{required: true, equalTo: '#passwd'}, //Nao aceita o campo Confirmacao de Senha do Endereco vazio
                dataNascimento:{required: true, dateBR: true}, //Nao aceita campo vazio e valida data
                checkboxTerm:{required: true} //Checkbox obrigatoriamente assinalado
            },
            messages: {
                name:{required: 'Campo Obrigatório'},
                sobName:{required: 'Campo Obrigatório'},
                cpfCnpj:{required: 'Campo Obrigatório'},
                tel:{required: 'Campo Obrigatório'},
                email:{required: 'Campo Obrigatório', email: 'Insira um email válido'},
                emailAlt:{required: 'Campo Obrigatório', email: 'Insira um email válido'},
                passwd:{required: 'Campo Obrigatório', minlength: 'Senha de no minimo 3 caracteres'},
                passwdConfirm:{required: 'Campo Obrigatório', equalTo: 'Senhas diferentes'},
                dataNascimento:{required: 'Campo Obrigatório'},
                checkboxTerm:{required: 'Aprove os termos de uso antes de continuar'}
            },
            submitHandler: function(form){
                //Aqui pega o formulário e o converte em JSON
                var json = JSON.parse(JSON.stringify(jQuery('#myform').serializeArray()));
                
                //Abro uma conexão com o outro servidor, do tipo Post, passo a URL da API, 
                $.post({
                    type: 'POST', //Tipo de Conexao
                    url: 'http://localhost:3050/user/register', //URL da API
                    dataType: 'json', //Tipo de dado que sera transferido
                    data: json, //Enviando o formulario em formato JSON
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8', //Envio em URLEncoded
                    success: function(data) {
                        alert('Cadastrado com Sucesso');
                        location.href='./index.html';
                    },
                    error: function(result){
                        console.log(result)
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