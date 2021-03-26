// A jogada sempre será iniciada pelo jogador 1.
// O jogador 1 marca o ponto -1.
// O jogador 2 marca o ponto 1.
// A cada  rodada deve-se verificar os pontos na horizontal, vertical e diagonal.
// Se o resultado da verificação retornar -3, jogador 1 ganhou a partida.
// Se o resultado da verificação retornar 3, jogador 2 ganhou a partida.




/*
	$('#btn_iniciar_jogo').click(function(){   }			-> Quando for clicado para iniciar o jogo, checa se foram passados
															os nomes dos dois jogadores e mostra o tabuleiro para iniciar o jogo

	$('.jogada').click(function(){   }			-> Pega o 'id' do campo do tabuleiro onde a jogada foi realizada, não permite que
		- jogada(id_campo_clicado)					mais jogadas sejam feitas nesse campo e chama a fução 'jogada()'

	jogada(id_campo_clicado)			-> A cada clique checa se é uma rodada ímpar (do jogador 1 - X) ou rodada 
		- verifica_combinacao()				par (do jogador 2 - O), aplica a imagem da jogada (X ou O) e computa a pontuação
											de -1 (jogador 1) ou de +1 (jogador 2) no local da matriz 3x3 que representa o campo
											da jogada.

	verifica_combinacao()			-> Verifica as pontuações horizontal/vertical/diagonal
		- ganhador(pontos)

	ganhador(pontos)			-> A partir da pontuação ao final de cada rodada, checa se há ganhador
*/






var rodada = 1;
var matriz_jogo = Array(3); //Array de 3x3 [a1 a2 a3]
							//			   [b1 b2 b3]
							//			   [c1 c2 c3]

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;



$(document).ready(function(){ //Inicia assim que o documento/página terminar de carregar

	$('#btn_iniciar_jogo').click(function(){ //função que inicia o jogo

		//Valida a digitação dos apelidos dos jogadores:
		if($('#entrada_apelido_jogador_1').val() == ''){
			alert("Apelido do jogador 1 não foi preenchido");
			return false;
		}
		if($('#entrada_apelido_jogador_2').val() == ''){
			alert("Apelido do jogador 2 não foi preenchido");
			return false;
		}

		//Exibir os apelidos informados nos spans correspondentes:
		$('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
		$('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());

		//Controla visualização da divs:
		$('#pagina_inicial').hide(); //oculta a parte inicial, onde informamos os nomes dos jogadores e então dá play no jogo
		$('#palco_jogo').show() //mostra o tabuleiro onde o jogo será jogado


	});

	$('.jogada').click(function(){ //A cada clique em um campo do tabuleiro (todos são caracterizados pela mesma classe '.jogada')

		var id_campo_clicado = this.id; //Captura o 'id' do campo onde foi clicado
		$('#' + id_campo_clicado).off(); //Não pode mais clicar nesse campo
		jogada(id_campo_clicado); //Chama a função de jogada

	})


	function jogada(id_campo_clicado){
		var icone = '';
		var ponto = 0;

		 if(rodada % 2 == 1){ //Jogador 1 joga nas rodadas ímpares [X]
		 	ponto = -1;
		 	icone = 'url("imagens/marcacao_1.png")'
		 } else { //Jogador 2 joga nas rodadas pares [O]
		 	ponto = 1;
		 	icone = 'url("imagens/marcacao_2.png")'
		 }

		 rodada++; //Mais uma rodada foi jogada

		 $("#" + id_campo_clicado).css('background-image' , icone); //Acrescenta X ou O ao campo, dependendo de quem jogou

		 var linha_coluna = id_campo_clicado.split('-'); //O id é representado por letra-número (exemplo: a-1, b-2, c-3, ...)

		 matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto; //linha_coluna[0] -> representa a letra armazenada
		 														//linha_coluna[1] -> representa o número armazenado

		 verifica_combinacao(); //Após a jogada realizada tem que verificar a combinação para saber se já tem um vencedor ou não
	}


	function verifica_combinacao(){

		//VERIFICA NA HORIZONTAL:
		var pontos = 0;
		for(var i = 1; i <= 3; i++){ //Verificando na linha 'a'
			pontos = pontos + matriz_jogo['a'][i];

		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){ //Verificando na linha 'b'
			pontos = pontos + matriz_jogo['b'][i];

		}
		ganhador(pontos);

		pontos = 0;
		for(var i = 1; i <= 3; i++){ //Verificando na linha 'c'
			pontos = pontos + matriz_jogo['c'][i];

		}
		ganhador(pontos);


		//VERIFICA NA VERTICAL:
		for(var i = 1; i <= 3; i++){
			pontos = 0;
			pontos = pontos + matriz_jogo['a'][i];
			pontos = pontos + matriz_jogo['b'][i];
			pontos = pontos + matriz_jogo['c'][i];
			ganhador(pontos);
		}


		//VERIFICA NA DIAGONAL: (são 2 diagonais)
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);

	}

	function ganhador(pontos){ //Verifica se há ganhador
		if(pontos == -3){
			var jogador_1 = $('#entrada_apelido_jogador_1').val(); //Pega o nome inserido no input que representa o jogador 1
			alert(jogador_1 + " é o vencedor!");
			$('.jogada').off(); //Tudo que tem a classe '.jogada' (ou seja, todas as áreas possíveis do tabuleiro) não terão
								// mais função de clique. O jogo para.
		}else if(pontos == 3){
			var jogador_2 = $('#entrada_apelido_jogador_2').val(); //Pega o nome inserido no input que representa o jogador 2
			alert(jogador_2 + " é o vencedor!");
			$('.jogada').off(); //Tudo que tem a classe '.jogada' (ou seja, todas as áreas possíveis do tabuleiro) não terão
								// mais função de clique. O jogo para.
		}
	}


});