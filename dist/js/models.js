import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { scene, textureLoader } from './scene.js';

export let avatarCube, globe, sunGroup;

//////////// Avatar Cube
export function initAvatarCube() {
	const avatarCubeTexture = textureLoader.load('static/textures/avatarCube.jpg');

	avatarCube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: avatarCubeTexture }));
	avatarCube.position.set(3, 0, -5)
	avatarCube.rotation.set(0, -0.4, 0)
	
	scene.add(avatarCube);
}
//////////// Avatar Cube

//////////// Globe
const globeTexture = textureLoader.load('static/textures/earthmap.jpg');
globe = new THREE.Mesh(new THREE.SphereGeometry(1.75, 100, 100), new THREE.MeshPhongMaterial( { map: globeTexture} ));
globe.position.set(-100, -100, -100)
globe.rotation.set(0.2, -1.5, -0.3)

scene.add(globe);
//////////// Globe

//////////// Sun
sunGroup = new THREE.Group();
const sunTexture = textureLoader.load('static/textures/sunmap.jpg');
const sun = new THREE.Mesh(new THREE.SphereGeometry(0.1, 100, 100), new THREE.MeshPhongMaterial( { map: sunTexture} ));
const sunLight = new THREE.PointLight(0xffffff);

sunGroup.add(sunLight);
sunGroup.add(sun);

sunGroup.position.set(-100, -100, -100);
sunGroup.rotation.set(0.2, -1.5, -0.3);
scene.add(sunGroup);
//////////// Sun
