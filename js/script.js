$(function()
{
	var inicia = false;
	//crear array con las animaciones
	var animacion1=["zoomInLeft","flip","tada","flash","swing","slideInUp","rotateln","bonuceInDown","zoomInDown","lightSpeedIn","flipInY"];
	var animacion2=["fadeOutDown","bonuceOutUp","zoomOutLeft","zoomOut","bonuceOutRight","flipOutX","fadeOutRighBig","zoomOutDown"];
	//creo variable para la puntuacion
	$("#puntuacion").hide();
	var puntaje=0;
	swal("Bienvenido", "Diviertete jugando el GameKey", "success");
	$("#start").click(function(event)
	{
		$(this).fadeOut('fast', function() {
			setInterval(letraMuestra, 3000);
			inicia = true;
		});
	});

	//Para generar letras aleatorias...
	var letraMuestra = function()
	{
		//Se debe obtener una letra aleatoria del alfabeto y ubicarla en una posición aleatoria...
		var numLetra = Math.floor(Math.random() * 26) + 97;
		var posLetra = {
							left : Math.floor(Math.random() * (screen.width - 100)), 
							top  : Math.floor(Math.random() * (screen.height - 150))
						};
		var letraPone = String.fromCharCode(numLetra).toUpperCase();
		var divLetra = "<div class = 'circulo letra_"+(letraPone)+" '" + 
							"style = \"left : "+(posLetra.left)+"px; top : "+(posLetra.top) + 
							"px; background-color: " + randomColor()+"\">" + 
							(String.fromCharCode(numLetra).toUpperCase()) + 
						"</div>";
		$("body").append(divLetra);
		//ahora creo una variable aleatoria para aparecer la letra
		var animaleatoria1 = Math.floor(Math.random() * animacion1.length);
		//ahora array que contiene aleatorio para aparecer la letra
		var anima1=animacion1[animaleatoria1];
		//flash, wobble
		$(".letra_" + letraPone).addClass("animated " + anima1);
	};

	//Para detectar eventos de teclado...
	$(document).keypress(function(event)
	{
		//console.log(event.keyCode, txtLetra);
		if(event.keyCode >= 97 && event.keyCode <= 122 && inicia)
		{
			var letraPresiona = String.fromCharCode(event.keyCode).toUpperCase();
			//Número de ocrrencias de la letra...
			var numVeces = $(".letra_" + letraPresiona).size();
			console.log("Veces letra presionada:", numVeces);
			//ahora creo una variable aleatoria para desaparecer la letra
			var animaleatoria2 = Math.floor(Math.random() * animacion2.length);
			//ahora array que contiene aleatorio para desaparecer la letra
			var anima2=animacion2[animaleatoria2];
			$(".letra_" + letraPresiona).addClass("animated " + anima2).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function()
			{	$(this).remove();
				//PROCESO DE PUNTUACION
				if(numVeces >1) 
				{ 
					puntaje += Number(numVeces);
				}
				else{
					puntaje++;
				}
				$("#puntuacion").show();
				$("#puntuacion").html("Su Puntaje es : "+puntaje);
				
			});
		}
	});

	var randomColor = function()
	{
    	// from http://www.paulirish.com/2009/random-hex-color-code-snippets/
    	return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
    	(c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
  	};
});