import { onWindowResize } from './scene.js'
import { initSkybox } from './skybox.js'
import { initAvatarCube } from './models.js'
import { animate } from './animation.js'
import { initContactForm } from './buttons.js'

function init() {
	// reset the scroll when the page is reloaded to make sure our animations aren't getting messed up 
	if (history.scrollRestoration) {
		history.scrollRestoration = 'manual';
	} else {
		window.onbeforeunload = function () {
			window.scrollTo(0, 0);
		}
	}
	window.onload = function() {
		initContactForm();
	}
	// add the various models
	initSkybox();
	initAvatarCube();

	window.addEventListener('resize', onWindowResize, false);
}

init();
animate();