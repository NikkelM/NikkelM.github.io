export function initContactForm() {
	let contactFormLink = document.getElementById("contactLink");

	//Set code to run when the link is clicked
	// by assigning a function to "onclick"
	contactFormLink.onclick = function() {
		overlayContactForm();
		return false;
	}
}

function overlayContactForm() {
  document.getElementById("contactForm").style.display = "block";
	document.body.style = "overflow: hidden;";
}

function removeContactForm() {
  document.getElementById("contactForm").style.display = "none";
	document.body.style = "";
}