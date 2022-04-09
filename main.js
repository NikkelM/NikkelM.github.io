import './style.css';
import * as THREE from 'three';

// Setup

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
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

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
	const geometry = new THREE.SphereGeometry(0.25, 24, 24);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3)
		.fill()
		.map(() => THREE.MathUtils.randFloatSpread(100));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

new THREE.CubeTextureLoader().setPath('/images/SpaceboxCollection/Spacebox6/').load(
	// urls of images used in the cube texture
	[
		'SkyBlue2_right1.png',
		'SkyBlue2_left2.png',
		'SkyBlue2_top3.png',
		'SkyBlue2_bottom4.png',
		'SkyBlue2_front5.png',
		'SkyBlue2_back6.png'
	],
	// what to do when loading is over
	function (cubeTexture) {
		// CUBE TEXTURE is also an option for a background
		scene.background = cubeTexture;
		renderer.render(scene, camera);
	}
);

// Avatar

const profileTexture = textureLoader.load('images/profile.jpg');

const profile = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: profileTexture }));
profile.position.z = -5;
profile.position.x = 3;
profile.rotation.y = -0.4;

scene.add(profile);

// Animation template from https://sbcode.net/threejs/animate-on-scroll/

// Animation Helpers

function lerp(start, end, a) {
	return (1 - a) * start + a * end;
}

// Used to fit the lerps to start and end at specific scrolling percentages
function scalePercent(start, end) {
	return (scrollPercent - start) / (end - start)
}

// Animation scripts that will each be run whenever the user scrolls

const animationScripts = []

//add an animation that moves the camera backwards throughout the whole scroll progress
animationScripts.push({
	start: 0,
	end: 101,
	func: () => {
			camera.position.z = lerp(0, 20, scalePercent(0, 100))
	},
});
// END CAMERA

//add an animation that rotates the profile cube throughout the whole scroll process
animationScripts.push({
	start: 0,
	end: 101,
	func: () => {
			profile.rotation.y = lerp(-0.4, 5, scalePercent(0, 100))
	},
});

// How far down the rabbit hole are we???
let scrollPercent = 0

document.body.onscroll = () => {
		//calculate the current scroll progress as a percentage
		scrollPercent = ((document.documentElement.scrollTop || document.body.scrollTop) / 
			((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight)) * 100;
};

// Animation Loop

// Loop through all scripts and run each of them
function playScrollAnimations() {
	animationScripts.forEach((animation) => {
			if (scrollPercent >= animation.start && scrollPercent < animation.end) {
				animation.func();
			}
	});
};

function animate() {
	requestAnimationFrame(animate);

	playScrollAnimations();

	renderer.render(scene, camera);
}

animate();