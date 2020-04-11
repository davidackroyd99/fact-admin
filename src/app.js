const { ipcRenderer } = require('electron');

document.getElementById("nf-submit").addEventListener("click", createFact)

function createFact() {
	ipcRenderer.send("create-fact", getNewFactData());
}

function getNewFactData() {
	return {
		"Title": document.getElementById("nf-title").value,
		"Url": document.getElementById("nf-url").value,
		"Contributors": document.getElementById("nf-contrib").value,
		"Tags": document.getElementById("nf-tags").value,
		"Body": document.getElementById("nf-body").value,
	};
}

ipcRenderer.on("publish-complete", function(events, args) {
	console.log("publish complete");
})

var registerButton = (buttonId, sendEvent, listenFor) => {
	document.getElementById(buttonId).addEventListener("click", () => {
		document.getElementById(buttonId).style.visibility = "hidden";
		ipcRenderer.send(sendEvent);
	});
}

registerButton("task-publish", "publish", undefined);
registerButton("task-latest", "get-latest", undefined);
registerButton("task-build", "local-build", undefined);