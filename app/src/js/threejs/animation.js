// Animation template from https://sbcode.net/threejs/animate-on-scroll/
import { Clock } from 'three/src/core/Clock.js'
import { scene, camera, renderer } from './scene.js'
import { skybox, starGroup } from './skybox.js'
import { avatarCube, globe } from './models.js'

// constants
const scrollArrow = document.getElementById('scrollArrow');

// framerate limit
let clock = new Clock();
let delta = 0;
let interval = 1 / 110;

/////////////// Animation Helpers
function lerp(start, end, a) {
	return (1 - a) * start + a * end;
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
	return (scrollPercent - start) / (end - start);
}

let scrollPercent = 0;
document.body.onscroll = () => {
	// calculate the current scroll progress as a percentage
	scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) /
		((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;

	// rotate the globe extra fast on scroll
	if ((scrollPercent >= 25 && scrollPercent <= 45) || (scrollPercent >= 60 && scrollPercent <= 80)) {
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

// Fade out the scrollArrow on initial scroll
animationScripts.push({
	start: 0,
	end: 4,
	func: () => {
		scrollArrow.style.opacity = lerp(1, 0, scalePercent(0, 3));
	}
});

// To prevent the scrollArrow from not disappearing completely if the user scrolls very fast
animationScripts.push({
	start: 4,
	end: 100,
	func: () => {
		scrollArrow.style.opacity = 0;
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
	start: 25,
	end: 35,
	func: () => {
		globe.position.z = lerp(-5, -15, scalePercent(25, 35));
	}
});

// Move it back to the correct position before ending the animation
animationScripts.push({
	start: 35,
	end: 45,
	func: () => {
		globe.position.z = lerp(-15, -5, scalePercent(35, 45));
	}
});

// Move the globe to the other side of the screen
animationScripts.push({
	start: 25,
	end: 45,
	func: () => {
		globe.position.x = lerp(-4, 4.5, scalePercent(25, 45));
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
	if (delta > interval) {
		playScrollAnimations();
		renderer.render(scene, camera);
		delta = delta % interval;
	}
}
/////////////// Main Animation Loop