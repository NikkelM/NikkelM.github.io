import './style.css';
import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();

scene.fog = new THREE.FogExp2(0x000000, 0.0002);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000);

const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
	canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.render(scene, camera);
}

// Lights

// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

// const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);


// Stars

const starGroup = new THREE.Group();
let starGeometry = new THREE.SphereGeometry(0.05);

const numStars = 500;
// we need some variety of materials for the blinking to appear more random
const numStarMaterials = numStars/10;
const starMaterials = [];

for(let i=0; i<numStarMaterials; i++) {
	starMaterials.push(new THREE.MeshBasicMaterial());
}

for (let i = 0; i < numStars; i++) {
  let star = new THREE.Mesh(starGeometry, starMaterials[i%numStarMaterials]);

	let [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
	star.material.transparent = true;
  starGroup.add(star);
}
scene.add(starGroup);

// end stars

// Skybox

const materialArray = ['images/skybox/right1.png', 'images/skybox/left2.png', 'images/skybox/top3.png', 'images/skybox/bottom4.png',
	'images/skybox/front5.png', 'images/skybox/back6.png'].map(image => {
	let texture = textureLoader.load(image);
	return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
});

const skybox = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), materialArray);

scene.add(skybox);


// Avatar

const profileTexture = textureLoader.load('images/profile.jpg');

const profile = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: profileTexture }));
const profileStartPositionX = 3;
const profileStartPositionY = 0;
const profileStartPositionZ = -5;
const profileStartRotationX = 0;
const profileStartRotationY = -0.4;
// profile.position.x = profileStartPositionX;
// profile.position.y = profileStartPositionY;
profile.position.z = profileStartPositionZ;
// profile.rotation.y = profileStartRotationY;

scene.add(profile);

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
let scrollPercent = 0;

document.body.onscroll = () => {
		//calculate the current scroll progress as a percentage
		scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) / 
			((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;
}

/////////////////////////
// Animation scripts that will each be run whenever the user scrolls

const animationScripts = [];

// These are the continuous animations which play no matter the scroll percentage, and independent of
animationScripts.push({
	start: 0,
	end: 101,
	func: () => {
		// skybox
		skybox.rotation.x += 0.001;
		skybox.rotation.y -= 0.0005;

		// stars
		starGroup.rotation.x += 0.001;
		starGroup.rotation.y -= 0.0005;
		starGroup.children.forEach((star) => {
			lightness > 1 ? lightness = 0 : lightness += 0.005;
			star.material.opacity = lightness;
		});
	}
});

// Add an animation that rotates the profile cube throughout the whole scroll process
animationScripts.push({
	start: 0,
	end: 30,
	func: () => {
			profile.rotation.x = lerp(profileStartRotationX, 1.5, scalePercent(0, 30));
			profile.rotation.y = lerp(profileStartRotationY, -1.5, scalePercent(0, 30));
			profile.position.x = lerp(profileStartPositionX, 10, scalePercent(0, 30));
			profile.position.y = lerp(profileStartPositionY, 10, scalePercent(0, 30));
	}
});

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

let lightness = 0;

function animate() {
	requestAnimationFrame(animate);
	playScrollAnimations();

	renderer.render(scene, camera);
}

function init() {
	// reset the scroll when the page is reloaded to make sure our animations aren't getting messed up 
	if (history.scrollRestoration) {
		history.scrollRestoration = 'manual';
	} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
	}
	// start the animation loop
	animate()
}

init();