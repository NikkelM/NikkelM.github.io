import { Mesh } from 'three/src/objects/Mesh.js'
import { MeshBasicMaterial } from 'three/src/materials/MeshBasicMaterial.js'
import { BoxGeometry } from 'three/src/geometries/BoxGeometry.js'
import { SphereGeometry } from 'three/src/geometries/SphereGeometry.js'
import { Vector3 } from 'three/src/math/Vector3.js'
import { Group } from 'three/src/objects/Group.js'
import { randFloatSpread } from 'three/src/math/MathUtils.js';
import { scene, textureLoader } from './scene.js';

export let skybox, starGroup;

// Skybox
export function initSkybox() {
	const materialArray = ['right1', 'left2', 'top3', 'bottom4', 'front5', 'back6'].map(image => {
		let texture = textureLoader.load(`../textures/skybox/${image}.jpg`);
		return new MeshBasicMaterial({ map: texture, side: 1 });
	});

	skybox = new Mesh(new BoxGeometry(100, 100, 100), materialArray);
	scene.add(skybox);
	initStars();
}

// Stars
function initStars() {
	starGroup = new Group();
	let starGeometry = new SphereGeometry(0.05);

	const numStars = 500;
	// we need some variety of materials for the blinking to appear more random
	const numStarMaterials = numStars / 5;
	const starMaterials = [];

	for (let i = 0; i < numStarMaterials; i++) {
		starMaterials.push(new MeshBasicMaterial());
	}

	for (let i = 0; i < numStars; i++) {
		let star = new Mesh(starGeometry, starMaterials[i % numStarMaterials]);

		// Get a positional vector for the star, it should be between 30 and 40 units from the camera
		let vec = new Vector3(randFloatSpread(70), randFloatSpread(70), randFloatSpread(70)).clampLength(30, 40)
		star.position.set(vec.x, vec.y, vec.z);

		star.material.transparent = true;
		starGroup.add(star);
	}
	scene.add(starGroup);
}