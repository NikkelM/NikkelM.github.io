import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { scene, textureLoader } from './scene.js';

export let avatarCube, globe, sun, sunPivot;

//////////// Avatar Cube
export function initAvatarCube() {
	const avatarCubeTexture = textureLoader.load('static/textures/avatarCube.jpg');

	avatarCube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: avatarCubeTexture }));
	avatarCube.position.set(3, 0, -5);
	avatarCube.rotation.set(0, -0.4, 0);
	
	// scene.add(avatarCube);
}
//////////// Avatar Cube

//////////// Sun
sunPivot = new THREE.Object3D();
sunPivot.position.set(1, 0, -5);

const sunTexture = textureLoader.load('static/textures/sunmap.jpg');
sun = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 20), new THREE.MeshBasicMaterial( { map: sunTexture } ));
const sunLight = new THREE.PointLight(0xffffff, 0.5);
sun.add(sunLight);
sunPivot.add(sun);

scene.add(sunPivot);
//////////// Sun

//////////// Globe
const globeTexture = textureLoader.load('static/textures/earthmap.jpg');
globe = new THREE.Mesh(new THREE.SphereGeometry(0.25, 50, 50), new THREE.MeshPhongMaterial( { map: globeTexture } ));
globe.rotation.set(0.2, -1.5, -0.3);

sunPivot.add(globe);
// offset from the sunPivot
globe.position.set(-1, 0, -1);
//////////// Globe