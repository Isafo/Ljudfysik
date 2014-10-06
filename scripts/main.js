require([
  'scripts/audio-example'
], function(audioExample) {
  'use strict';
  console.log(audioExample);
  audioExample.startFFT();
  startGL(audioExample);
	});

var boxHeight = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5];

var cube = [];

function startGL(audioExample){
			var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);
			document.body.appendChild(renderer.domElement);


			var boxWidth = (window.innerWidth / (22 * 100));
			var boxMargin = boxWidth * 2;
			var screenwidth = window.innerWidth;
     	 	var boxColor = [0xff0000, 0xff2500, 0xff5000, 0xff7500, 0xffaa00, 0xffff00, 0xaaff00, 0x75ff00, 0x50ff00, 0x25ff00, 0x00ff00, 0x00ff25, 0x00ff50, 0x00ff75, 0x00ffaa, 0x00ffff, 0x00aaff, 0x0075ff, 0x0050ff, 0x0025ff]; //färgkodade enligt box 0 till höger och box 20 till vänster

			for(var i = 0; i < 20; i++){

				var geometry = new THREE.BoxGeometry(boxWidth , 0.2 ,0);
				var material = new THREE.MeshBasicMaterial({color: boxColor[i]});
				cube[i] = new THREE.Mesh(geometry, material);
				
				cube[i].position.x = -(screenwidth * 0.0048) + i*boxWidth*boxMargin;
				console.log('cube position: ' + (screenwidth *0.0006) + 10*i*boxWidth*boxMargin + ' cube index: ' + i);

		
				scene.add(cube[i]);
			}


			console.log(cube[0]);
			camera.position.z = 5;

			var render = function () {
				for(var i = 0; i < 20; i++){
					//console.log("boxHeight: " + boxHeight);
					cube[i].scale.y = Math.abs(boxHeight[i]);
				}
				requestAnimationFrame(render);
				renderer.render(scene, camera);
			};

			render();
		}

function changeBoxHeight(heightArray){
	console.log("Change!");
	boxHeight = heightArray;
}