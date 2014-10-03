#pragma strict

function Start () {

}

function Update () {
	
	//hämtar Transformerat ljud från unity
	var spectrum : float[] = AudioListener.GetSpectrumData(256, 0, FFTWindow.Hamming);
	
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
		else if (j<64) // 31 + 32 = 64  ********** här tar tabellvärderna slut ifall 64
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
		else 
		{
			Debug.Log("du har räknat fel på spectrums lägnd");
		}
	}
	
	// höjer pelarna för att de var för små förut
	var skala : float =  5;	
	for(var h=0;h<20;h++)
	{
		intervall[h] = intervall[h] * skala; 
	}
	
	// hämtar alla objekt i unity med taggen capsel	
	var cubes : GameObject[] = GameObject.FindGameObjectsWithTag("Capsule");
	for(var i=0; i<cubes.length; i++)
	{
		// måste sotera på namn så att de olika stolparna hamnar på rad
		switch(cubes[i].name)
		{
			case 'intervall1': if (cubes[i].transform.localScale.y < intervall[0]) {cubes[i].transform.localScale.y = intervall[0];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall2': if (cubes[i].transform.localScale.y < intervall[1]) {cubes[i].transform.localScale.y = intervall[1];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall3': if (cubes[i].transform.localScale.y < intervall[2]) {cubes[i].transform.localScale.y = intervall[2];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall4': if (cubes[i].transform.localScale.y < intervall[3]) {cubes[i].transform.localScale.y = intervall[3];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall5': if (cubes[i].transform.localScale.y < intervall[4]) {cubes[i].transform.localScale.y = intervall[4];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall6': if (cubes[i].transform.localScale.y < intervall[5]) {cubes[i].transform.localScale.y = intervall[5];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall7': if (cubes[i].transform.localScale.y < intervall[6]) {cubes[i].transform.localScale.y = intervall[6];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall8': if (cubes[i].transform.localScale.y < intervall[7]) {cubes[i].transform.localScale.y = intervall[7];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall9': if (cubes[i].transform.localScale.y < intervall[8]) {cubes[i].transform.localScale.y = intervall[8];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall10': if (cubes[i].transform.localScale.y < intervall[9]) {cubes[i].transform.localScale.y = intervall[9];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall11': if (cubes[i].transform.localScale.y < intervall[10]) {cubes[i].transform.localScale.y = intervall[10];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall12': if (cubes[i].transform.localScale.y < intervall[11]) {cubes[i].transform.localScale.y = intervall[11];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall13': if (cubes[i].transform.localScale.y < intervall[12]) {cubes[i].transform.localScale.y = intervall[12];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall14': if (cubes[i].transform.localScale.y < intervall[13]) {cubes[i].transform.localScale.y = intervall[13];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall15': if (cubes[i].transform.localScale.y < intervall[14]) {cubes[i].transform.localScale.y = intervall[14];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall16': if (cubes[i].transform.localScale.y < intervall[15]) {cubes[i].transform.localScale.y = intervall[15];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall17': if (cubes[i].transform.localScale.y < intervall[16]) {cubes[i].transform.localScale.y = intervall[16];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall18': if (cubes[i].transform.localScale.y < intervall[17]) {cubes[i].transform.localScale.y = intervall[17];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall19': if (cubes[i].transform.localScale.y < intervall[18]) {cubes[i].transform.localScale.y = intervall[18];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
			case 'intervall20': if (cubes[i].transform.localScale.y < intervall[19]) {cubes[i].transform.localScale.y = intervall[19];} else {cubes[i].transform.localScale.y = cubes[i].transform.localScale.y * 0.99;} break; 
		}
		/*
		När jag sickar till isabelle kanske en sån här loop räcker ;)
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
	//Debug.Log("low: "+ intervall1 +" medium: "+ intervall3 +" högt: "+ intervall7 );

} 