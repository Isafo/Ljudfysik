require([
  'scripts/audioFFT'
], function(audioFFT) {
  'use strict';
  console.log(audioFFT);
  audioFFT.startFFT();
  startGL(audioFFT);
	});

var boxHeight = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
var cube = [];

function startGL(audioFFT){
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);


			var screenwidth = window.innerWidth / 2;
			var boxWidth = (screenwidth / 16.55);
			var boxMargin = boxWidth * 0.1;
			var maxHeight = window.innerHeight / 2;
     	 	var boxColor = [0xff0000, 0xff2000, 0xff4000, 0xff6000, 0xff8000, 0xffaa00, 0xffff00, 0xaaff00, 0x80ff00, 0x60ff00, 0x40ff00, 0x20ff00, 0x00ff00, 0x00ff20, 0x00ff40, 0x00ff60, 0x00ff80, 0x00ffaa, 0x00ffff, 0x00aaff, 0x0080ff, 0x0060ff,0x0040ff , 0x0020ff, 0x0000ff, 0x2000ff, 0x4000ff, 0x6000ff ,0x8000ff,0xaa00ff,0xff00ff]; //färgkodade enligt box 0 till höger och box 20 till vänster
			//färgkodade enligt box 0 till höger och box 31 till vänster

			for(var i = 0; i < 31; i++){

				var geometry = new THREE.BoxGeometry(boxWidth , 10 ,0);
				var material = new THREE.MeshBasicMaterial({color: boxColor[i]});
				cube[i] = new THREE.Mesh(geometry, material);
				
				cube[i].position.x = - screenwidth + i * boxWidth + i * boxMargin;
		
				scene.add(cube[i]);
			}



			console.log(cube[0]);
			camera.position.z = (window.innerWidth / 2) ;

			var render = function () {
				for(var i = 0; i < 31; i++){
					//console.log("boxHeight: " + boxHeight);
					cube[i].scale.y = Math.abs(boxHeight[i]);
				}
				requestAnimationFrame(render);
				renderer.render(scene, camera);
			};
			
			render();
		}

function changeBoxHeight(heightArray){
	//console.log("Change!" + heightArray );
	boxHeight = heightArray;
}