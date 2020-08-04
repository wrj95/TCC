$(document).ready(function(){
    $.getJSON('http://buscafrete.com:3050/lista/estados', function (data) {
        var options = '<option value="">escolha um estado</option>'; //Iniciando com um Option default	
        $.each(data, function (key, val) {
            //Para cada Item Nome encontrado no JSON adicionar ao Select
            options += '<option value="' + val.cod_uf + '">' + val.des_uf + '</option>';
        });					
        $("#estados").html(options); //Adiciona no Select estado do HTML
        
        $("#estados").change(function () {	//Quando uma cidade for escolhida	
        
            var options_cidades = '';
            var str = "";					
            
            $("#estados option:selected").each(function () {
                str += $(this).val(); //Pegando o Estado foi selecionado no Estado
                
            });
            $.getJSON('http://buscafrete.com:3050/lista/cidades/' + str, function (data){
                var options_cidades = '<option value="">escolha uma Cidade</option>';    
                $.each(data, function (key, val) {		
                    options_cidades += '<option value="' + val.cod_municipio + '">' + val.des_municipio + '</option>';
                });
                $("#cidades").html(options_cidades); //Adicione as Cidades no Select
            });
            
        }).change();		
    });

    var MobileBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00)00000-0000' : '(00)0000-00009';
        },
        mobileOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(MobileBehavior.apply({}, arguments), options);
            }
        };
    $('#tel').mask(MobileBehavior, mobileOptions); //Tratando Numero de Telefone
    $('#cnpj').mask("00000000000000") //Tratando CNPJ
    
    $("#name_fant").keyup(function() { //Validacao do campo nome
        //Substitui por nada, tudo aquilo que nao for de encontro com o Regx declarado, ou seja, letra e caracteres especiais
		var valor = $("#name_fant").val().replace(/[^ a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ]/,'');
		$("#name_fant").val(valor)
    });
    
    $("#raz_soc").keyup(function() { //Validacao do campo nome
        //Substitui por nada, tudo aquilo que nao for de encontro com o Regx declarado, ou seja, letra e caracteres especiais
		var valor = $("#raz_soc").val().replace(/[^ a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ]/,'');
		$("#raz_soc").val(valor)
    }); 

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
        }, "CNPJ Inválido");

        $('#myform').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                name_fant:{required: true}, //Nao aceita nome fantasia vazio
                cnpj:{required: true, cnpj: true}, //Nao aceita o campo CPF vazio
                tel:{required: true, minlength: 10}, //Nao aceita o campo Telefone vazio
                email:{required: true, email: true}, //Nao aceita o campo Email vazio e um email válido
                emailAlt:{required: true, email: true}, //Nao aceita o campo Email Alternativo vazio e um email válido
                passwd:{required: true, minlength: 3}, //Nao aceita o campo Senha do Endereco vazio, senha de no minimo 3 caracteres
                passwdConfirm:{required: true, equalTo: '#passwd'}, //Nao aceita o campo Confirmacao de Senha do Endereco vazio e igual ao campo Senha
                checkboxTerm:{required: true}, //Obriga a marcacao do Termos de Uso
                estados: {required: true}, //obriga a selecao do Estado
                cidades:{required: true}, //obrigado a selecao da Cidade
                endEmp:{required: true}
            },
            messages: {
                name_fant:{required: 'Campo Obrigatório'},   
                cnpj:{required: 'Campo Obrigatório'},
                tel:{required: 'Campo Obrigatório', minlength: 'Telefone inválido'},                        
                email:{required: 'Campo Obrigatório', email: 'E-mail Inválido'},
                emailAlt:{required: 'Campo Obrigatório', email: 'E-mail Inválido'},
                passwd:{required: 'Campo Obrigatório', minlength: 'Senha de no minimo 3 caracteres'},
                passwdConfirm:{required: 'Campo Obrigatório', equalTo: 'senhas diferentes'},
                checkboxTerm:{required: 'Aprove os termos de uso antes de continuar'},
                estados:{required: 'Campo Obrigatório'},
                cidades: {required: 'Campo Obrigatório'},
                endEmp: {required: 'Campo Obrigatório'}
            },
            submitHandler: function(form){
                //Aqui pega o formulário e o converte em JSON
                var json = JSON.parse(JSON.stringify(jQuery('#myform').serializeArray()));
                
                //Abro uma conexão com o outro servidor, do tipo Post, passo a URL da API, 
                $.ajax({
                    type: 'POST', //Tipo de Conexao
                    url: 'http://buscafrete.com:3050/company/register', //URL da API
                    dataType: 'json', //Tipo de dado que sera transferido
                    data: json, //Enviando o formulario em formato JSON
                    contentType: 'application/x-www-form-urlencoded;charset=UTF-8', //Envio em URLEncoded
                    success: function(data) {
                         alert('Cadastro realizado com Sucesso');
                         location.href="http://buscafrete.net:80/LoginEmp.html"
                    },
                    error: function(request, status, erro){
                        //Captando o erro retornado da API
                        var erroJ = JSON.parse(request.responseText);

                        //Se o erro for igual a "Email is already in use !", significa que Email ja possui cadastro
                        if(erroJ.data == "Email is already in use !"){
                            alert("Email informado já possui cadastro");
                        };
                        ////Se o erro for igual a "CPF is already in use !", significa que CPF ja possui cadastro
                        if(erroJ.data == "CNPJ is already in use !"){
                            alert("CNPJ informado já possui Cadastro");
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