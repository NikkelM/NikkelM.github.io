console.log("Made with ❤️ by @NikkelM");
console.log("Find the source code at https://github.com/NikkelM/NikkelM.github.io");

import { initContactForm } from './contactForm.js'

function init() {
	window.onload = function() {
		initContactForm();
	}
}

init();