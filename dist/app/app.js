"use strict";
exports.__esModule = true;
var ipc = electron.ipcRenderer;
var buildStatusElem = document.getElementById('build-status');
ipc.on('travis-build-status', function (event, arg) {
    status = Number(arg);
    if (status == 1) {
        buildStatusElem.innerHTML = "Travis build status: passing";
    }
    else {
        buildStatusElem.innerHTML = "Travis build status: failing";
    }
});
//# sourceMappingURL=app.js.map