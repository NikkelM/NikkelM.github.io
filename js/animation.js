// Animation template from https://sbcode.net/threejs/animate-on-scroll/
import { Clock } from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { scene, camera, renderer } from './scene.js'
import { skybox, starGroup } from './skybox.js'
import { avatarCube, globe } from './models.js'

// framerate limit
let clock = new Clock();
let delta = 0;
let interval = 1/110;

/////////////// Animation Helpers
function lerp(start, end, a) {
	return (1 - a) * start + a * end;
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
	return (scrollPercent - start) / (end - start);
}

let scrollPercent = 0;
// How much has the user scrolled yet?
document.body.onscroll = () => {
	//calculate the current scroll progress as a percentage
	scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) / 
		((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;
		if((scrollPercent >= 30 && scrollPercent <= 50) || (scrollPercent >= 60 && scrollPercent <= 80)) {
			globe.rotation.y -= 0.1;
		}
}
/////////////// Animation Helpers

/////////////// Animation Scripts that will be run whenever the user scrolls
const animationScripts = [];
let starLightness = 0;

// These are the continuous animations which play no matter the scroll percentage
animationScripts.push({
	start: 0,
	end: 101,
	func: () => {
		// skybox
		skybox.rotation.x += 0.001;
		skybox.rotation.y -= 0.0005;
		skybox.rotation.z += 0.001;

		// avatarCube
		avatarCube.rotation.y -= 0.005;

		// globe
		globe.rotation.y -= 0.0025;

		// stars
		starGroup.rotation.x += 0.001;
		starGroup.rotation.y -= 0.0005;
		starGroup.rotation.z += 0.001;
		starGroup.children.forEach((star) => {
			starLightness > 1 ? starLightness = 0 : starLightness += 0.005;
			star.material.opacity = starLightness;
		});
	}
});

// Move the avatarCube cube out of the way when the initial header moves out of view
animationScripts.push({
	start: 0,
	end: 25,
	func: () => {
		avatarCube.rotation.x = lerp(0, 2, scalePercent(0, 25));
		avatarCube.rotation.z = lerp(0, -2, scalePercent(0, 25));
		avatarCube.position.x = lerp(3, 10, scalePercent(0, 25));
		avatarCube.position.y = lerp(0, 10, scalePercent(0, 25));
	}
});

///////// Globe
// Move the globe in after the avatarCube is gone
animationScripts.push({
	start: 5,
	end: 20,
	func: () => {
		globe.position.x = lerp(-2, -4, scalePercent(5, 20));
		globe.position.y = lerp(-2, 0, scalePercent(5, 20));
		globe.position.z = lerp(1, -5, scalePercent(5, 20));
	}
});

// Move the globe "backwards" a little during the transition
animationScripts.push({
	start: 30,
	end: 40,
	func: () => {
		globe.position.z = lerp(-5, -15, scalePercent(30, 40));
	}
});

// Move it back to the correct decision before ending the animation
animationScripts.push({
	start: 40,
	end: 50,
	func: () => {
		globe.position.z = lerp(-15, -5, scalePercent(40, 50));
	}
});

// Move the globe to the other side of the screen
animationScripts.push({
	start: 30,
	end: 50,
	func: () => {
		globe.position.x = lerp(-4, 4.5, scalePercent(30, 50));
	}
});

// Move the globe "backwards" a little during the transition
animationScripts.push({
	start: 60,
	end: 70,
	func: () => {
		globe.position.z = lerp(-5, -15, scalePercent(60, 70));
	}
});

// Move it back to the correct decision before ending the animation
animationScripts.push({
	start: 70,
	end: 80,
	func: () => {
		globe.position.z = lerp(-15, -5, scalePercent(70, 80));
	}
});

// Move the globe to the other side of the screen
animationScripts.push({
	start: 60,
	end: 80,
	func: () => {
		globe.position.x = lerp(4.5, -4, scalePercent(60, 80));
	}
});
///////// Globe
/////////////// Animation Scripts that will be run whenever the user scrolls

/////////////// Main Animation Loop
// Loop through all scripts and run each of them
function playScrollAnimations() {
	animationScripts.forEach((animation) => {
			if (scrollPercent >= animation.start && scrollPercent < animation.end) {
				animation.func();
			}
	});
}

export function animate() {
	requestAnimationFrame(animate);

	delta += clock.getDelta();
   if (delta  > interval) {
			 playScrollAnimations();
			 renderer.render(scene, camera);
       delta = delta % interval;
   }
}
/////////////// Main Animation Loop