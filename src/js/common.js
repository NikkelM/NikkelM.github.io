import Cookies from 'js-cookie';
import './navBar.js';

console.log("Made with ❤️ by @NikkelM");
console.log("Find the source code at https://github.com/NikkelM/NikkelM.github.io");

init();

function init() {
	window.onload = function () {
		initContactForm();
		checkCookieConsent();

		// Fade out the loadingOverlay
		document.getElementById("loadingOverlay").classList.add("fadeOut");
		setTimeout(function() {
			document.getElementById("loadingOverlay").style.display = "none";
		}, 500);
	}
}

// ----- Contact form -----
function initContactForm() {
	let contactFormLinks = document.querySelectorAll(`[id^="contactLink"]`);

	contactFormLinks.forEach(element => {
		element.onclick = function() {
			overlayContactForm();
			return false;
		}
	});

	let contactForm = document.getElementById("contactForm");
	// stopPropagation to stop the whole contact form from disappearing if the form is clicked
	contactForm.addEventListener('click', function(e) {
		e.stopPropagation();
	})
}

function overlayContactForm() {
  document.getElementById("contactFormDiv").onclick = function() {
		document.getElementById("contactFormDiv").style.display = "none";
		document.body.style = "";
	}
  document.getElementById("contactFormDiv").style.display = "block";
}

// ----- Cookies -----
function checkCookieConsent() {
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
