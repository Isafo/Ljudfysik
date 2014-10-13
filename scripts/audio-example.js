require([
  '$api/models',
  '$api/audio'
], function(models, audio) {
  'use strict';

  var startFFT = function() {  
  	// hämtar ljudet i realtid, audio.BAND31 ser till att vi får frekvensspectrat indelat i 31 st delband som är lagon anpassade för visualisering
	var analyzer = audio.RealtimeAnalyzer.forPlayer(models.player, audio.BAND31);
	
	//varje gång en ny buffert av ljud är redo kommer denna funktion att kalllas med ljuddatat.
	analyzer.addEventListener('audio', function(data){

		// Arrayen data.audio.spectrum.left innehåller frekvenserna i ljudet som spelas ur den vänstra högtalaren
		//console.log("data.audio.spectrum.left " + data.audio.spectrum.left);  // ser hur ljudet representeras
		var scaledSpectrum = [];  // vår array med 31 delband från frekvensbandet

		for(var i = 0; i < 31; i++){			
			// data.audio.spectrum.left ger värden mellan ? och -96 därför gör jag en ful lösning och skriver såhär för att få en korekt representation med positiva tal.				
			// scaledSpectrum[i] =  96 - Math.abs(data.audio.spectrum.left[i]);
			/*if (data.audio.spectrum.left[i] >= 0) {scaledSpectrum[i] = 96 + data.audio.spectrum.left[i]; } // om talen är possitiva
				else {scaledSpectrum[i] =  96 - Math.abs(data.audio.spectrum.left[i]);} */
			if (data.audio.spectrum.left[i] >= 0) {scaledSpectrum[i] = 96 + data.audio.spectrum.left[i] } // om talen är possitiva 
			else if(86 - Math.abs(data.audio.spectrum.left[i]) > 0){scaledSpectrum[i] =  86 - Math.abs(data.audio.spectrum.left[i]);} // om talen är neggativa + brusredusering
			else {scaledSpectrum[i] =  0.000001;} // om talen är -95 så får inte värdet vara 0 ty då får vi problem med renderingen 
			
		}

		// normaliserar bandet mellan 0 och 30 och lägger in i vår array 
		var ratio = Math.max.apply( Math, scaledSpectrum)/60; // ratio är maxvärdet 			
		for (var k = 0; k < 31; k++)
		{
			scaledSpectrum[k] = scaledSpectrum[k]/ ratio;
		}

		// här ska jag sicka arrayen scaledSpectrum[] till renderingen
		changeBoxHeight(scaledSpectrum);
	});
};

  exports.startFFT = startFFT;
});
