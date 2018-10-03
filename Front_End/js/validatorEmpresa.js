$(document).ready(function(){
    $('#tel').mask("(99)9999-9999"); //Tratando Numero de Telefone
    $('#cel').mask("(99)99999-9999"); //Tratando Numero de Celular
    $('#cnpj').mask("99999999999999") //Tratando CNPJ

    $('#cadastrar').click(function (e) { //Quando o botao do formulario e acionado
        $.validator.addMethod("cnpj", function(cnpj, element) {
            cnpj = jQuery.trim(cnpj);
            var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
            digitos_iguais = 1;

            if (cnpj.length < 14 && cnpj.length < 15){
                return this.optional(element) || false;
            }
            for (i = 0; i < cnpj.length - 1; i++){
                if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
                    digitos_iguais = 0;
                    break;
                }
            }

            if (!digitos_iguais){
                tamanho = cnpj.length - 2
                numeros = cnpj.substring(0,tamanho);
                digitos = cnpj.substring(tamanho);
                soma = 0;
                pos = tamanho - 7;

                for (i = tamanho; i >= 1; i--){
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2){
                        pos = 9;
                    }
                }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0)){
                return this.optional(element) || false;
            }
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--){
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2){
                    pos = 9;
                }
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1)){
                return this.optional(element) || false;
            }
            return this.optional(element) || true;
            }else{
                return this.optional(element) || false;
            }
        }, "Informe um CNPJ válido.");

        $('#myform').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                name_fant:{required: true}, //Nao aceita nome fantasia vazio
                raz_soc:{required: true}, //Nao aceita razao social vazio
                cnpj:{required: true, cnpj: true}, //Nao aceita o campo CPF vazio
                tel:{required: true}, //Nao aceita o campo Telefone vazio
                email:{required: true, email: true}, //Nao aceita o campo Email vazio e um email válido
                emailAlt:{required: true, email: true}, //Nao aceita o campo Email Alternativo vazio e um email válido
                passwd:{required: true, minlength: 3}, //Nao aceita o campo Senha do Endereco vazio, senha de no minimo 3 caracteres
                passwdConfirm:{required: true, equalTo: '#passwd'}, //Nao aceita o campo Confirmacao de Senha do Endereco vazio e igual ao campo Senha
                checkboxTerm:{required:true}
            },
            messages: {
                name_fant:{required: 'Campo Obrigatório'},
                raz_soc:{required: 'Campo Obrigatório'},    
                cnpj:{required: 'Campo Obrigatório'},
                tel:{required: 'Campo Obrigatório'},                        
                email:{required: 'Campo Obrigatório', email: 'Insira um Endereço de E-mail válido'},
                emailAlt:{required: 'Campo Obrigatório', email: 'Insira um Endereço de E-mail válido'},
                passwd:{required: 'Campo Obrigatório', minlength: 'Senha de no minimo 3 caracteres'},
                passwdConfirm:{required: 'Campo Obrigatório', equalTo: 'senhas diferentes'}
            },
            submitHandler: function(form){
                //Aqui pega o formulário e o converte em JSON
                var json = JSON.parse(JSON.stringify(jQuery('#myform').serializeArray()));
                
                //Abro uma conexão com o outro servidor, do tipo Post, passo a URL da API, 
                $.post({
                    type: 'POST', //Tipo de Conexao
                    url: 'http://localhost:3050/company/register', //URL da API
                    dataType: 'json', //Tipo de dado que sera transferido
                    data: json, //Enviando o formulario em formato JSON
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8', //Envio em URLEncoded
                    success: function(data) {
                         alert('Cadastro realizado com Sucesso');
                         location.href("./home.html")
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