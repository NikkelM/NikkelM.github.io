import { Mesh, BoxGeometry, SphereGeometry, MeshBasicMaterial } from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { scene, textureLoader } from './scene.js';

export let avatarCube, globe;

//////////// Avatar Cube
export function initAvatarCube() {
	const avatarCubeTexture = textureLoader.load('../textures/avatarCube.jpg');

	avatarCube = new Mesh(new BoxGeometry(3, 3, 3), new MeshBasicMaterial({ map: avatarCubeTexture }));
	avatarCube.position.set(3, 0, -5)
	avatarCube.rotation.set(0, -0.4, 0)
	
	scene.add(avatarCube);
}
//////////// Avatar Cube

//////////// Globe
const globeTexture = textureLoader.load('../textures/earthmap.jpg');
globe = new Mesh(new SphereGeometry(1.75, 100, 100), new MeshBasicMaterial( { map: globeTexture} ));
globe.position.set(-100, -100, -100)
globe.rotation.set(0.2, -1.5, -0.3)

scene.add(globe);
//////////// Globe
