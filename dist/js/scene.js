import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';

////////// Textureloader
// loading screen init
const loadingManager = new THREE.LoadingManager(() => {
	const loadingScreen = document.getElementById('loading-screen');
	loadingScreen.classList.add('fade-out');
	loadingScreen.addEventListener('transitionend', onLoadingScreenTransitionEnd);
});

export let textureLoader = new THREE.TextureLoader(loadingManager);

// will be called when the loading screen has finished
function onLoadingScreenTransitionEnd( event ) {
	document.body.style = "";
	event.target.remove();
};
////////// Textureloader

////////// Camera
export let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

export let scene = new THREE.Scene();	
scene.fog = new THREE.FogExp2(0x000000, 0.02);

export let renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
	canvas: document.querySelector('#bg'),
});
////////// Camera


// ////////// Lights
// const pointLight = new THREE.PointLight(0xffffff, 0.75);
// pointLight.position.set(0, 10, 5);
// scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
////////// Lights

////////// Renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
////////// Renderer

export function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}