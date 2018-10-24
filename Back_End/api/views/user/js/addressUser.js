$(document).ready(function(){
    $.get('user/states', function (data) {
        var items = [];
        var options = '<option value="">escolha um estado</option>'; //Iniciando com um Option default	
        $.each(data, function (key, val) {
            //Para cada Item Nome encontrado no JSON adicionar ao Select
            options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
        });					
        $("#UF").html(options); //Adiciona no Select estado do HTML
        
        $("#UF").change(function () {	//Quando uma cidade for escolhida	
        
            var options_cidades = '';
            var str = "";					
            
            $("#UF option:selected").each(function () {
                str += $(this).text(); //Pegando o Estado foi selecionado no Estado
            });
            $.get('user/cities',{"state": str}, function (data){
                $.each(data, function (key, val) {		
                    options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
                });
                $("#municipio").html(options_cidades); //Adicione as Cidades no Select
            });
            
        }).change();		
    
    });

    $('#btnConfirmar').click(function (e) { //Quando o botao do formulario e acionado
        $('#formAddress').validate({ //Validação dos campos do formulário
            rules: { //Regras de Validacao
                cep:{required: true}, //Nao aceita nome fantasia vazio
                UF:{required: true}, //Nao aceita o campo CPF vazio
                municipio:{required: true}, //Nao aceita o campo Telefone vazio
                endereco:{required: true}, //Nao aceita o campo Email vazio e um email válido
                numero:{required: true}, //Nao aceita o campo Email Alternativo vazio e um email válido
                bairro:{required: true}, //Nao aceita o campo Senha do Endereco vazio, senha de no minimo 3 caracteres
                complemento:{required: true} //Nao aceita o campo Confirmacao de Senha do Endereco vazio e igual ao campo Senha
            },
            messages: {
                cep:{required: 'Campo Obrigatório'},   
                UF:{required: 'Campo Obrigatório'},
                municipio:{required: 'Campo Obrigatório'},                        
                endereco:{required: 'Campo Obrigatório'},
                numero:{required: 'Campo Obrigatório'},
                bairro:{required: 'Campo Obrigatório'},
                complemento:{required: 'Campo Obrigatório'}
            }    
        });
    });
})