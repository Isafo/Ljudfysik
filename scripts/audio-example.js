require([
  '$api/models',
  '$api/audio'
], function(models, audio) {
  'use strict';

  var startFFT = function() {  
  	// hämtar ljudet i realtid
	var analyzer = audio.RealtimeAnalyzer.forPlayer(models.player);
	
	//varje gång en ny buffert av ljud är redo kommer denna funktion att kalllas med ljuddatat.
	analyzer.addEventListener('audio', function(data){

		// Arrayen data.audio.spectrum.left innehåller frekvenserna i ljudet

		//Eftersom frekvenserna är uppdelade på 511 band och vi bara vill ha 20st, så måste vi skala om dem så att de hamnar i en array på 20 element
		//console.log(data.audio.spectrum.left.length); //här ser vi att antalet är 511
 			var bandsPerScaledBand = Math.floor(data.audio.spectrum.left.length / 20);  // antalet mindre band som hamnar i de 20 banden vi vill representera
			var scaledSpectrum = [];  // vår array med band
			for(var i = 0; i < 20; i++){
				var band = 0.;  // ett band i vår array
				for(var j = 0; j < bandsPerScaledBand; j++){
					band += data.audio.spectrum.left[(i * bandsPerScaledBand) + j]; // läggen in värden i bandet
				}
				scaledSpectrum[i] = band / bandsPerScaledBand; 
			}

			// normaliserar bandet och lägger in i vår array
			var ratio = Math.max.apply( Math, scaledSpectrum);
			for (var k = 0; k < 20; k++)
			{
				scaledSpectrum[i] = scaledSpectrum[i]/ ratio;
			}
			// här ska jag sicka arrayen scaledSpectrum[] till isabelle
			changeBoxHeight(scaledSpectrum);
	});
};

  exports.startFFT = startFFT;
});
