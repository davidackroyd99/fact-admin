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

ipcRenderer.on("publish-complete", function(event, args) {
	console.log("publish complete");
})

var registerButton = (buttonId, sendEvent, listenFor) => {
	var elem = document.getElementById(buttonId);

	elem.addEventListener("click", () => {
		elem.style.visibility = "hidden";
		ipcRenderer.send(sendEvent);
	});

	ipcRenderer.on(listenFor, function(event, exitCode) {
		console.log(`complete, exit code ${exitCode}`);

		if(exitCode !== 0) {
			alert(`${sendEvent} failed.`);
		}

		elem.style.visibility = "visible";
	})
}

registerButton("task-publish", "publish", "publish-complete");
registerButton("task-latest", "get-latest", "latest-complete");
registerButton("task-build", "local-build", "build-complete");