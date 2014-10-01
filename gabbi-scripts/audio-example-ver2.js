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

		//hämtar Transformerat ljud från Spotift
		var spectrum : float[] = data.audio.spectrum.left.length;
		
		// Skapar min array ( 20 värden)
		var intervall : float[] = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
		
		// lägger in värden i min array		
		var n = 0;
		for (var j=0; j<spectrum.length; j++)
		{//försöker nån form av dubbleringsprinsip
			if (j<2) // lägsta tonerna: 2
			{
				intervall[0] += spectrum[j];
			}
			else if (j<4) // 2 + 2 = 4   2#2
			{
				intervall[1] += spectrum[j];
			}
			else if (j<8) // 4 + 4 = 8   2#3
			{
				intervall[2] += spectrum[j];
			}
			else if (j<16) // 8 + 8 = 16
			{
				intervall[3] += spectrum[j];
			}
			else if (j<32) // 16 + 16 = 32
			{
				intervall[4] += spectrum[j];
			}
			else if (j<64) // 31 + 32 = 64  
			{
				intervall[5] += spectrum[j];
			}
			else if (j<128) // 64 + 64 = 128
			{
				intervall[6] += spectrum[j];
			}
			else if (j<256) //  128 + 128 = 256  2#8
			{
				intervall[7] += spectrum[j];
			}
			/*else 
			{
				//Debug.Log("du har räknat fel på spectrums lägnd");
			}*/
		}
		
		// höjer pelarna för att de var för små förut
		var skala : float =  5;	
		for(var h=0;h<20;h++)
		{
			intervall[h] = intervall[h] * skala; 
		}
		
		// hämtar alla objekt i från isabelle	
		//var cubes : GameObject[] = GameObject.FindGameObjectsWithTag("Capsule");
		
		for(var i=0; i<cubes.length; i++)
		{
			/* //När jag sickar till isabelle kanske en sån här loop räcker ;)
			if (cubes[i].transform.localScale.y < intervall[i]) 
			{
				cubes[i].transform.localScale.y = intervall[i];
			} 
			else 
			{
				cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;
			}		
			*/
		}	
	});
};

  exports.startFFT = startFFT;
});
