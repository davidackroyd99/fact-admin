const { ipcRenderer } = require('electron');

var buildStatusElem = document.getElementById('build-status')

ipcRenderer.on('travis-build-status', function (event, arg) {
	status = Number(arg);

	console.log("client");
	if(status == 1) {
		buildStatusElem.innerHTML = "Travis build status: <span style='color:green;'>passing</span>";
	}
	else {
		buildStatusElem.innerHTML = "Travis build status: <span style='color:red;'>failing</span>";
	}
})