import { scene, camera, renderer } from './scene.js'
import { skybox, starGroup, initSkybox} from './skybox.js'
import { avatarCube, initAvatarCube} from './models.js'

let scrollPercent = 0;
const animationScripts = [];
let starLightness = 0;

init();
animate();

function init() {
	// reset the scroll when the page is reloaded to make sure our animations aren't getting messed up 
	if (history.scrollRestoration) {
		history.scrollRestoration = 'manual';
	} else {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}
	}

	// Lights

	// const pointLight = new THREE.PointLight(0xffffff);
	// pointLight.position.set(5, 5, 5);

	// const ambientLight = new THREE.AmbientLight(0xffffff);
	// scene.add(pointLight, ambientLight);

	// add the various models
	initSkybox();
	initAvatarCube();

	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

// Animation template from https://sbcode.net/threejs/animate-on-scroll/
// Animation Helpers
function lerp(start, end, a) {
	return (1 - a) * start + a * end;
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
	return (scrollPercent - start) / (end - start);
}

// How much has the user scrolled yet?
document.body.onscroll = () => {
	//calculate the current scroll progress as a percentage
	scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) / 
		((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;
}

/////////////////////////
// Animation scripts that will each be run whenever the user scrolls

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
		// const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0).normalize(), 0.0001);
    // globe.position.applyQuaternion(quaternion);

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

// Animation that moves the avatarCube cube out of the way when the initial header moves out of view
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

// Add an animation that moves the globe in after the avatarCube is gone
// animationScripts.push({
// 	start: 5,
// 	end: 15,
// 	func: () => {
// 			globe.position.x = lerp(globeStartPositionX, -4, scalePercent(5, 15));
// 			globe.position.y = lerp(globeStartPositionY, 0, scalePercent(5, 15));
// 			globe.position.z = lerp(globeStartPositionZ, -5, scalePercent(5, 15));
// 	}
// });
/////////////////////////

// Animation Loop

// Loop through all scripts and run each of them
function playScrollAnimations() {
	animationScripts.forEach((animation) => {
			if (scrollPercent >= animation.start && scrollPercent < animation.end) {
				animation.func();
			}
	});
}

function animate() {
	requestAnimationFrame(animate);
	playScrollAnimations();
	renderer.render(scene, camera);
}
