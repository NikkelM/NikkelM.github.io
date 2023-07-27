import Cookies from 'js-cookie';
import './navBar.js';

console.log("Made with ❤️ by @NikkelM");
console.log("Find the source code at https://github.com/NikkelM/NikkelM.github.io");

init();

function init() {
	window.addEventListener('load', function() {
		initContactForm();
		checkCookieConsent();
	});
}

// ----- Contact form -----
function initContactForm() {
	let contactFormLinks = document.getElementsByClassName("contactLink");

	for (let i = 0; i < contactFormLinks.length; i++) {
		contactFormLinks[i].onclick = function() {
			overlayContactForm();
			return false;
		}
	}

	let contactForm = document.getElementById("contactForm");
	// stopPropagation to stop the whole contact form from disappearing if the form is clicked
	contactForm.addEventListener('click', function(e) {
		e.stopPropagation();
	});
	setupFormSubmission(contactForm);
}

function overlayContactForm() {
	const contactFormDiv = document.getElementById("contactFormDiv");
  contactFormDiv.onclick = function() {
		contactFormDiv.style.display = "none";
		document.body.style = "";
	}
  contactFormDiv.style.display = "block";
}

function setupFormSubmission(form) {
	const result = document.getElementById('result');

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		object.access_key = "d8cb0be5-68b2-4c0c-91e7-4f9f4a13e9ea";
		object.replyto = object.email;
		const json = JSON.stringify(object);
		result.innerText = "Please wait...";
		result.style.display = "block";

		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: json
		})
		.then(async (response) => {
			let json = await response.json();
			if (response.status == 200) {
				result.innerText = "Your message has been sent!";
			} else {
				console.log(response);
				result.innerText = json.message;
			}
			form.reset();
			setTimeout(() => {
				result.style.display = "none";
				document.getElementById("contactFormDiv").style.display = "none";
			}, 3000);
		})
		.catch(error => {
			console.log(error);
			result.innerText = "Something went wrong!";
			setTimeout(() => {
				result.style.display = "none";
			}, 3000);
		});
	});
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
