"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var ipc = require('electron').ipcMain;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    electron_1.app.quit();
}
var createWindow = function () {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: 700,
        width: 933,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
var repoPath = "/home/david/Documents/fun-facts";
var Fact = /** @class */ (function () {
    function Fact() {
    }
    return Fact;
}());
function printFact(fact) {
    var dateString = new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate();
    return "!meta\n\ntitle:" + fact.Title + "\nurl:" + fact.Url + "\ncontributors:" + fact.Contributors + "\ncreated:" + dateString + "\nmodified:" + dateString + "\ntags:" + fact.Tags + "\n\n!endmeta\n" + fact.Body + "\n";
}
ipc.on("create-fact", function (event, args) {
    console.log(printFact(args));
});
//# sourceMappingURL=index.js.map