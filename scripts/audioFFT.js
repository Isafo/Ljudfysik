require([
  '$api/models',
  '$api/audio'
], function(models, audio) {
  'use strict';
		
	//var max = 0.0;
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
				if (data.audio.spectrum.left[i] >= 0) {scaledSpectrum[i] = 96 + data.audio.spectrum.left[i] } // om talen är possitiva 
				else if(86 - Math.abs(data.audio.spectrum.left[i]) > 0){scaledSpectrum[i] =  86 - Math.abs(data.audio.spectrum.left[i]);} // om talen är neggativa + brusredusering
				else {scaledSpectrum[i] =  0.000001;} // om talen är -95 så får inte värdet vara 0 ty då får vi problem med renderingen 		
			}
			
			//letar max rekvens
			//if (max < Math.max.apply( Math, scaledSpectrum)) {max = Math.max.apply( Math, scaledSpectrum);}
			//console.log("max ferekvens " + max);  // ser vilket maximala värdet är 
			//efter att ha kollat igenom några låtar har vi funnit att 110 är det största frekvensvärdet som förekommit men vi säger 120 för att vara på säkra sidan
		
			// normaliserar bandet mellan 0 och 60 och lägger in i vår array 
			var ratio = 120/60; //  120 är det största talet som förrekommer
			for (var k = 0; k < 31; k++)
			{
				scaledSpectrum[k] = scaledSpectrum[k]/ ratio; // delar med största förekommande tal så att det blir 1 sen gångrar med 60 för att få värderna mellan 1 och 60.
			}

			// här ska jag sicka arrayen scaledSpectrum[] till renderingen
			changeBoxHeight(scaledSpectrum);
		});
	};

  	exports.startFFT = startFFT;
});
