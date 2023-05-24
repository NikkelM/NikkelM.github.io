import Cookies from 'js-cookie';

const navBar = document.getElementById('navBar');
const navLinks = document.querySelectorAll('.navLink');
const closeButton = document.querySelector('.closeButton');
const openNavBarButton = document.getElementById('openNavBarButton');
const navBarContents = document.getElementById('navBarContents');

let shouldContinueStartAnimations = true;

// Open the navigation bar when the menu button is clicked
function openNavBar() {
	// Set a cookie to remember the navBar was opened
	Cookies.set('navBarOpened', 'true', { expires: 1 });
	navBar.style.width = '250px';
}

// Close the navigation bar when the close button is clicked
function closeNavBar() {
	navBar.style.width = '0';
	// Changing this to not include the padding animates the social links moving down out of view
	navBar.style.height = '100%';
}

// Close the navigation bar when the user clicks outside of it
window.addEventListener('click', function (event) {
	if (event.target !== navBar && !navBar.contains(event.target)) {
		closeNavBar();
	}
});

// Add event listeners to the menu button and close button
openNavBarButton.addEventListener('click', function (event) {
	// Changing this to include the padding animates the social links moving up into view
	navBar.style.height = 'calc(100% - 120px)';

	// Are we interrupting the start-up animations by opening the navigation bar early?
	if (shouldContinueStartAnimations) {
		shouldContinueStartAnimations = false;
		navBarContents.style.display = 'block';
		openNavBarButton.classList.remove('wiggle');
	}

	openNavBar();
	event.stopPropagation();
});

closeButton.addEventListener('click', function (event) {
	closeNavBar();
	event.stopPropagation();
});

// Add event listeners to the navigation links to close the navigation bar when a link is clicked
navLinks.forEach(function (link) {
	link.addEventListener('click', closeNavBar);
});

// On page load, wiggle the menu button and peek the navigation bar
window.addEventListener('load', function () {
	// Only play the animations if the navigation bar has not been opened before in this session
	if (!Cookies.get('navBarOpened')) {
		openNavBarButton.classList.add('wiggle');

		// After 100ms, peek the menu bar, but hide its contents
		setTimeout(function () {
			if (!shouldContinueStartAnimations) return;
			navBarContents.style.display = 'none';
			navBar.style.width = '60px';
		}, 100);

		// After 1000ms, stop wiggling the menu button
		setTimeout(function () {
			openNavBarButton.classList.remove('wiggle');
		}, 1000);

		// After 1500ms, close the menu bar again, so it is visible for 1400ms
		setTimeout(function () {
			if (!shouldContinueStartAnimations) return;
			navBar.style.width = '0';
		}, 1500);

		// After the menu bar is closed, make its contents visible again
		setTimeout(function () {
			navBarContents.style.display = 'block';
		}, 1700);
	}
});

