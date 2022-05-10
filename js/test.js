import { onWindowResize, renderer, scene, camera, } from './scene.js'
import { initSkybox } from './skybox.js'

function init() {
	// reset the scroll when the page is reloaded to make sure our animations aren't getting messed up 
	if (history.scrollRestoration) {
		history.scrollRestoration = 'manual';
	} else {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}
	}

	// add the various models
	initSkybox();

	window.addEventListener('resize', onWindowResize, false);
}

init();
renderer.render(scene, camera);