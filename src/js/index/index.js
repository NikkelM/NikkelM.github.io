import '../common.js';

init();

function init() {
	// Fade out the loadingOverlay
	document.getElementById("loadingOverlay").classList.add("fadeOut");
	setTimeout(function() {
		document.getElementById("loadingOverlay").style.display = "none";
	}, 500);
}