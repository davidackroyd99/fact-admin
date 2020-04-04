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
    ipcRenderer.send("publish");
});
//# sourceMappingURL=app.js.map