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
		console.log(data.audio.spectrum.left); 
 			var bandsPerScaledBand = Math.floor(data.audio.spectrum.left.length / 20);  // antalet mindre band som hamnar i de 20 banden vi vill representera
			var scaledSpectrum = [];  // vår array med band
			for(var i = 0; i < 20; i++){
				var band = 0.;  // ett band i vår array
				for(var j = 0; j < bandsPerScaledBand; j++){
					// data.audio.spectrum.left ger värden mellan 0 och -96 därför gör jag en ful lösning och skriver såhär för att få en korekt representation mellan 0 och 96.
					band += 96 - Math.abs(data.audio.spectrum.left[(i * bandsPerScaledBand) + j]);
				}
				scaledSpectrum[i] = band / bandsPerScaledBand; 
			}
			console.log("band innan " + scaledSpectrum); 
			// normaliserar bandet mellan 0 och 40 och lägger in i vår array 
			var ratio = 96/40; // 95 är maxvärdet 
			console.log("Max värde " + ratio); 
			for (var k = 0; k < 20; k++)
			{
				scaledSpectrum[k] = scaledSpectrum[k]/ ratio;
			}
			console.log("band efter " + scaledSpectrum); 
			// här ska jag sicka arrayen scaledSpectrum[] till isabelle
			changeBoxHeight(scaledSpectrum);
	});
};

  exports.startFFT = startFFT;
});
