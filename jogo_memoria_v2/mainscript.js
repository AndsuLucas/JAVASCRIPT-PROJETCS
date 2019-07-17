(function(){
	'use strict';
	//capturando todas as imagens
	const imagens             = document.querySelectorAll("img");
	//guarda o último click
	var ultimoClick           = undefined;
	//imagem padrao "preta"
	var imagemPreta = "preto";
	//conjunto de imagens
	var arrayImagensSrc       = [
		"activity", "airplay", 
		"alert-circle", "align-center",
		"alert-octagon", "alert-triangle",  
		"align-justify", "align-left",
		"activity", "airplay", 
		"alert-circle", "align-center",
		"alert-octagon", "alert-triangle",  
		"align-justify", "align-left"
	 ]
	//contador de imagens
	var   quantidadeDeJogadas = 0;
	
	//adicionando evento de mostrar imagens aos elementos do dom
	imagens.forEach(function(elemento,posicao){
		
		elemento.addEventListener("click", mostrarImagem);
		
		//adicionando um número no id da imagem
		elemento.setAttribute("id", posicao);
	});
	//trocando a ordem das posições do src 'arrayImagensSrc'
	function embaralhasImagens(imgs){
		var quantidadeImg = imgs.length -1;
		
		var novaPosicao   = 0;
		
		for (var posicao = quantidadeImg; posicao > 0; posicao --){

			novaPosicao                  = Math.floor( Math.random() * posicao );
			var auxiliar                 = arrayImagensSrc[posicao];
			arrayImagensSrc[posicao]     = arrayImagensSrc[novaPosicao];
			arrayImagensSrc[novaPosicao] = auxiliar;

		}

	}
	embaralhasImagens(arrayImagensSrc);
	
	function checarJogada(elemento){
		
			if (elemento.getAttribute("src") === ultimoClick.getAttribute("src")){
				
				elemento.setAttribute("sit", "acerto");
				elemento.removeEventListener("click", mostrarImagem);
				
				ultimoClick.setAttribute("sit", "acerto")
				ultimoClick.removeEventListener("click", mostrarImagem);
				
				
			}else{					
				
				resetarImagem();

			}
		
		
	}
	function resetarImagem(){
		setTimeout(function(){
			imagens.forEach(function(imagem, posicao){
				if (imagem.getAttribute("sit") !== "acerto"){
					imagem.setAttribute("src", setarImagem(imagemPreta,"jpg"));
				}
				
			});
		},1000);
	}

	function setarImagem (img, tipo = "svg"){

		return "assets/imagens/"+img+"."+tipo; 

	}

	function mostrarImagem(){
		var id = this.getAttribute("id");
		this.setAttribute("src", setarImagem(arrayImagensSrc[id]));
		
		
			quantidadeDeJogadas++;
		
		if (quantidadeDeJogadas === 2){
			if (this !== ultimoClick){		
				checarJogada(this);	

			}else{
				resetarImagem();
			
			}

			quantidadeDeJogadas = 0;
			ultimoClick = undefined;
		}else{
			ultimoClick = this;
		
		}
	}			
		


	console.log(arrayImagensSrc);

})();