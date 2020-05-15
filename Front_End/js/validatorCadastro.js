$(document).ready(function(){

    $('#dataNascimento').mask("99/99/9999"); //Tratando o Data
    var MobileBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00)00000-0000' : '(00)0000-00009';
        },
        mobileOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(MobileBehavior.apply({}, arguments), options);
            }
        };
    $('#tel').mask(MobileBehavior, mobileOptions); //Tratando Numero de Telefone
    $('#cel').mask(MobileBehavior, mobileOptions); //Tratando Numero de Celular
    $('#cpf').mask("99999999999")

    $("#name").keyup(function() { //Validacao do campo nome
        //Substitui por nada, tudo aquilo que nao for de encontro com o Regx declarado, ou seja, letra e caracteres especiais
		var valor = $("#name").val().replace(/[^ a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ]/,'');
		$("#name").val(valor);
    });
    
    $("#sobName").keyup(function() { //Validacao do campo nome
        //Substitui por nada, tudo aquilo que nao for de encontro com o Regx declarado, ou seja, letra e caracteres especiais
		var valor = $("#sobName").val().replace(/[^ a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ]/,'');
		$("#sobName").val(valor);
    });
        
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
        }, "CPF Inválido."); 

        $('#myform').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                name:{required: true}, //Nao aceita o campo Nome vazio e nao pode passar de 50 caracteres
                sobName:{required: true}, //Nao aceita o campo SobreNome vazio e nao pode passar de 50 caracteres
                cpf:{required: true, cpf: true}, //Nao aceita o campo CPF vazio
                tel:{required: true, minlength: 10}, //Nao aceita o campo Telefone vazio   
                email:{required: true, email: true}, //Nao aceita o campo Email vazio
                emailAlt:{required: true, email: true}, //Nao aceita o campo Email Alternativo vazio
                passwd:{required: true, minlength: 3}, //Nao aceita o campo Senha do Endereco vazio
                passwdConfirm:{required: true, equalTo: '#passwd'}, //Nao aceita o campo Confirmacao de Senha do Endereco vazio
                dataNascimento:{required: true, dateBR: true}, //Nao aceita campo vazio e valida data
                checkboxTerm:{required: true} //Checkbox obrigatoriamente assinalado
            },
            messages: {
                name:{required: 'Campo Obrigatório', maxlenght: 'Excedeu o limite máximo de Caracteres'},
                sobName:{required: 'Campo Obrigatório', maxlenght: 'Excedeu o limite máximo de Caracteres'},
                cpf:{required: 'Campo Obrigatório'},
                tel:{required: 'Campo Obrigatório', minlength: 'Telefone inválido'},
                email:{required: 'Campo Obrigatório', email: 'Email Inválido'},
                emailAlt:{required: 'Campo Obrigatório', email: 'Email Inválido'},
                passwd:{required: 'Campo Obrigatório', minlength: 'Senha de no minimo 3 caracteres'},
                passwdConfirm:{required: 'Campo Obrigatório', equalTo: 'Senhas diferentes'},
                dataNascimento:{required: 'Campo Obrigatório'},
                checkboxTerm:{required: 'Aprove os termos de uso antes de continuar'}
            },
            submitHandler: function(form){
                //Aqui pega o formulário e o converte em JSON
                var json = JSON.parse(JSON.stringify(jQuery('#myform').serializeArray()));
                
                //Abro uma conexão com o outro servidor, do tipo Post, passo a URL da API, 
                $.ajax({
                    type: 'POST', //Tipo de Conexao
                    url: 'http://buscafrete.com:3050/user/register', //URL da API
                    dataType: 'json', //Tipo de dado que sera transferido
                    data: json, //Enviando o formulario em formato JSON
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8', //Envio em URLEncoded
                    success: function(data) {
                        alert('Cadastrado concluído com Sucesso');
                        location.href='./index.html';
                    },
                    error: function(request, status, erro){
                        //Captando o erro retornado da API
                        var erroJ = JSON.parse(request.responseText);

                        //Se o erro for igual a "Email is already in use !", significa que Email ja possui cadastro
                        if(erroJ.data == "Email is already in use !"){
                            alert("Email informado já possui cadastro");
                        };
                        ////Se o erro for igual a "CPF is already in use !", significa que CPF ja possui cadastro
                        if(erroJ.data == "CPF is already in use !"){
                            alert("CPF informado já possui Cadastro");
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