import Cookies from 'js-cookie';
import './navBar.js';

console.log("Made with ❤️ by @NikkelM");
console.log("Find the source code at https://github.com/NikkelM/NikkelM.github.io");

init();

function init() {
	window.addEventListener('load', function () {
		initContactForm();
		checkCookieConsent();
	});
}

// ----- Contact form -----
function initContactForm() {
	let contactFormLinks = document.getElementsByClassName("contactLink");

	for (let i = 0; i < contactFormLinks.length; i++) {
		contactFormLinks[i].onclick = function () {
			overlayContactForm();
			return false;
		}
	}

	let contactForm = document.getElementById("contactForm");
	// stopPropagation to stop the contact form from disappearing if the form is clicked
	contactForm.addEventListener('click', function (e) {
		e.stopPropagation();
	});

	contactForm.addEventListener('submit', async function (event) {
		event.preventDefault();
		const result = document.getElementById('result');

		// Select all elements with the notforyou class (honeypot fields)
		const honeypotFields = document.querySelectorAll('.notforyou');

		// Check if any honeypot fields are filled
		if (Array.from(honeypotFields).some(field => field.value)) {
			// If any honeypot fields are filled, it's likely a bot. Don't submit the form.
			console.log("You stepped in the honeypot!");
			result.innerText = "You stepped in the honeypot!";
			return;
		}

		result.innerText = "Submitting...";
		result.style.display = "block";

		const formData = new FormData(this);
		// Rename the form data keys to remove the hashes
		formData.set('name', formData.get('nameijkls'));
		formData.delete('nameijkls');
		formData.set('email', formData.get('emailgthum'));
		formData.delete('emailgthum');

		await fetch('https://formkeep.com/f/59830f272a04', {
			method: 'POST',
			body: formData,
		})
			.then(async (response) => {
				if (response.status == 200) {
					result.innerText = "Your message has been sent!";
				} else {
					result.innerText = "An error occurred and the form could not be submitted!";
				}
				contactForm.reset();
				setTimeout(() => {
					result.style.display = "none";
					closeContactForm();
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

function overlayContactForm() {
	const contactFormDiv = document.getElementById("contactFormDiv");

	contactFormDiv.onclick = function () {
		closeContactForm();
	}
	contactFormDiv.style.display = "block";

	// On mobile, prevent scrolling
	if (window.innerWidth < 768) {
		const html = document.getElementsByTagName('html')[0];
		html.setAttribute('style', 'overflow: hidden !important');
	}
}

function closeContactForm() {
	const contactFormDiv = document.getElementById("contactFormDiv");
	contactFormDiv.style.display = "none";
	document.body.style = "";

	const html = document.getElementsByTagName('html')[0];
	html.setAttribute('style', 'overflow: auto !important');
}

// ----- Cookies -----
function checkCookieConsent() {
	const cookieConsent = document.getElementById('cookieConsent');
	const acceptCookiesButton = document.getElementById('acceptCookiesButton');
	const declineCookiesButton = document.getElementById('declineCookiesButton');

	if (Cookies.get('cookieConsent') === undefined) {
		cookieConsent.style.display = 'block';

		acceptCookiesButton.addEventListener('click', function () {
			Cookies.set('cookieConsent', 'true', { expires: 365 });
			cookieConsent.style.display = 'none';
			cookiesAllowed();
		});

		declineCookiesButton.addEventListener('click', function () {
			// As per GDPR, we may ask the user again in 1 year
			Cookies.set('cookieConsent', 'false', { expires: 365 });
			cookieConsent.style.display = 'none';
		});

	} else if (Cookies.get('cookieConsent') === 'true') {
		cookiesAllowed();
	}
}

// Setup Google analytics if cookies are allowed
function cookiesAllowed() {
	window.dataLayer = window.dataLayer || [];
	function gtag() {
		dataLayer.push(arguments);
	}

	gtag("consent", "default", {
		ad_storage: "denied",
		analytics_storage: "granted",
	});

	gtag("js", new Date());
	gtag("config", "G-9K4WW3ECLR");
}
