$(document).ready(function(){

    $('.data').mask("99/99/9999");
	$('.hora').mask("99:99");
    $('.telefone').mask("(99) 9999-9999");
    $('.celular').mask("(99) 99999-9999");
    $('.cpf').mask("999.999.999-99");
	$('.monetario').mask('#.##0.00', {reverse: true});
	$('.cep').mask('99999-999');

});