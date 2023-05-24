import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
import { scene, textureLoader } from './scene.js';

export let skybox, starGroup;

// Skybox
export function initSkybox() {
	const materialArray = ['right1', 'left2', 'top3', 'bottom4', 'front5', 'back6'].map(image => {
		let texture = textureLoader.load(`../textures/skybox/${image}.jpg`);
		return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
	});

	skybox = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), materialArray);
	scene.add(skybox);
	initStars();
}

// Stars
function initStars() {
	starGroup = new THREE.Group();
	let starGeometry = new THREE.SphereGeometry(0.05);

	const numStars = 500;
	// we need some variety of materials for the blinking to appear more random
	const numStarMaterials = numStars/5;
	const starMaterials = [];

	for(let i=0; i<numStarMaterials; i++) {
		starMaterials.push(new THREE.MeshBasicMaterial());
	}

	for (let i = 0; i < numStars; i++) {
		let star = new THREE.Mesh(starGeometry, starMaterials[i%numStarMaterials]);

		// Get a positional vector for the star, it should be between 30 and 40 units from the camera
		let vec = new THREE.Vector3(THREE.MathUtils.randFloatSpread(70), THREE.MathUtils.randFloatSpread(70), THREE.MathUtils.randFloatSpread(70)).clampLength(30, 40)
		star.position.set(vec.x, vec.y, vec.z);

		star.material.transparent = true;
		starGroup.add(star);
	}
	scene.add(starGroup);
}