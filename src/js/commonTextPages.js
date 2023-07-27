import './common.js';

initTextPage();

function initTextPage() {
	window.addEventListener('load', function() {
			// Fade out the loadingOverlay
			document.getElementById("loadingOverlay").classList.add("fadeOut");
			setTimeout(function() {
					document.getElementById("loadingOverlay").style.display = "none";
			}, 500);
	});
}