import '../common.js';

initIndex();

function initIndex() {
	window.addEventListener('load', function() {
			// Fade out the loadingOverlay
			document.getElementById("loadingOverlay").classList.add("fadeOut");
			setTimeout(function() {
					document.getElementById("loadingOverlay").style.display = "none";
			}, 500);
	});
}