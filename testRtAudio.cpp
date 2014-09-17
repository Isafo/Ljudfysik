#include "RtAudio.h"

int main(){
	
	int channels = 2;
	int sampleRate = 44100;
	int bufferSize = 256;
	int nBuffers = 4; // number of internal buffers used by device
	int device = 0;

	RtAudio * audio = 0;


	// Default Rtaudio constructor
	try{
		audio = new RtAudio();
	}
	catch(RtError &error){
		//handle the exception
		error.printMessage();
		exit(EXIT_FAILURE);
	}

	try{
		audio->openStream(device, channels, 0, 0 RTAUDIO_FLOAT32, 
						  sampleRate, &bufferSize, nBuffers);
	}
	catch(RtError &error){
		error.printMessage();
	}

	//clean up, destructor
	delete audio;
	return 0;
}