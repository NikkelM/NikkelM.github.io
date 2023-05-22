const navBar = document.getElementById('navBar');
const navLinks = document.querySelectorAll('.navLink');
const closeButton = document.querySelector('.closeButton');
const openNavBarButton = document.getElementById('openNavBarButton');
const navBarContents = document.getElementById('navBarContents');

// Open the navigation bar when the menu button is clicked
function openNav() {
	navBar.style.width = '250px';
}

// Close the navigation bar when the close button is clicked
function closeNav() {
	navBar.style.width = '0';
}

// Close the navigation bar when the user clicks outside of it
window.addEventListener('click', function (event) {
	if (event.target !== navBar && !navBar.contains(event.target)) {
		closeNav();
	}
});

// Add event listeners to the menu button and close button
openNavBarButton.addEventListener('click', function (event) {
	openNav();
	event.stopPropagation();
});

closeButton.addEventListener('click', function (event) {
	closeNav();
	event.stopPropagation();
});

// Add event listeners to the navigation links to close the navigation bar when a link is clicked
navLinks.forEach(function (link) {
	link.addEventListener('click', closeNav);
});

// On page load, wiggle the menu button and peek the navigation bar
window.addEventListener('load', function () {
	openNavBarButton.classList.add('wiggle');

	setTimeout(function () {
		navBarContents.style.display = 'none';
		navBar.style.width = '60px';
	}, 100);

	setTimeout(function () {
		navBar.style.width = '0';
	}, 1500);

	setTimeout(function () {
		navBarContents.style.display = 'block';
	}, 1700);

	setTimeout(function () {
		openNavBarButton.classList.remove('wiggle');
	}, 1000);
});

