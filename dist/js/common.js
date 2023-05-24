import Cookies from 'js-cookie';
import './navBar.js';
import { initContactForm } from './contactForm.js';

console.log("Made with ❤️ by @NikkelM");
console.log("Find the source code at https://github.com/NikkelM/NikkelM.github.io");

function init() {
	window.onload = function () {
		initContactForm();
	}

	const cookieConsent = document.getElementById('cookieConsent');
	const acceptCookiesButton = document.getElementById('acceptCookiesButton');

	// Check if the user has already accepted cookies
	if (!Cookies.get('cookieConsent')) {
		// Show the cookie consent form
		cookieConsent.style.display = 'block';
	}

	// Add an event listener to the accept button
	acceptCookiesButton.addEventListener('click', function () {
		// Set a cookie to indicate that the user has accepted cookies
		Cookies.set('cookieConsent', 'true', { expires: 365 });

		// Hide the cookie consent form
		cookieConsent.style.display = 'none';
	});
}

init();