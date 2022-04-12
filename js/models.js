import { Mesh, BoxGeometry, MeshBasicMaterial } from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { scene, textureLoader } from './scene.js';

export let avatarCube, globe;

//////////// Avatar Cube
export function initAvatarCube() {
	const avatarCubeTexture = textureLoader.load('static/textures/avatarCube.jpg');

	avatarCube = new Mesh(new BoxGeometry(3, 3, 3), new MeshBasicMaterial({ map: avatarCubeTexture }));
	avatarCube.position.set(3, 0, -5)
	avatarCube.rotation.set(0, -0.4, 0)
	
	scene.add(avatarCube);
}
//////////// Avatar Cube

//////////// Globe
// const globeTexture = textureLoader.load('static/textures/earthmap.jpg');
// const globe = new THREE.Mesh(new THREE.SphereGeometry(1.75, 200, 200), new THREE.MeshBasicMaterial( { map: globeTexture} ));
// // const globeStartPositionX = -4;
// // const globeStartPositionY = -3;
// const globeStartPositionX = -2;
// const globeStartPositionY = -1;
// const globeStartPositionZ = -4;
// const globeStartRotationX = 0.2;
// const globeStartRotationY = -1.5;
// const globeStartRotationZ = -0.3;
// globe.position.set(globeStartPositionX, globeStartPositionY, globeStartPositionZ)
// globe.rotation.set(globeStartRotationX, globeStartRotationY, globeStartRotationZ)

// scene.add(globe);
//////////// Globe
