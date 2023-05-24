import {LoadingManager, TextureLoader, PerspectiveCamera, Scene, FogExp2, WebGLRenderer} from 'three';

////////// Textureloader
// loading screen init
const loadingManager = new LoadingManager(() => {
	const loadingScreen = document.getElementById('loading-screen');
	loadingScreen.classList.add('fade-out');
	loadingScreen.addEventListener('transitionend', onLoadingScreenTransitionEnd);
});

export let textureLoader = new TextureLoader(loadingManager);

// will be called when the loading screen has finished
function onLoadingScreenTransitionEnd( event ) {
	document.body.style = "";
	event.target.remove();
};
////////// Textureloader

////////// Camera
export let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

export let scene = new Scene();	
scene.fog = new FogExp2(0x000000, 0.02);

export let renderer = new WebGLRenderer({
	antialias: true,
	alpha: true,
	canvas: document.querySelector('#bg'),
});
////////// Camera

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