var _this = this;
var ipcRenderer = require('electron').ipcRenderer;
document.getElementById("nf-submit").addEventListener("click", createFact);
function createFact() {
    ipcRenderer.send("create-fact", getNewFactData());
}
function getNewFactData() {
    return {
        "Title": document.getElementById("nf-title").value,
        "Url": document.getElementById("nf-url").value,
        "Contributors": document.getElementById("nf-contrib").value,
        "Tags": document.getElementById("nf-tags").value,
        "Body": document.getElementById("nf-body").value
    };
}
document.getElementById("task-publish").addEventListener("click", function () {
    _this.style.visibility = 'hidden';
    ipcRenderer.send("publish");
});
document.getElementById("task-latest").addEventListener("click", function () {
    _this.style.visibility = 'hidden';
    ipcRenderer.send("get-latest");
});
document.getElementById("task-build").addEventListener("click", function () {
    _this.style.visibility = 'hidden';
    ipcRenderer.send("local-build");
});
ipcRenderer.on("publish-complete", function (events, args) {
    console.log("publish complete");
});
//# sourceMappingURL=app.js.map