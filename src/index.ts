import { app, BrowserWindow } from 'electron';
import * as path from 'path';

const ipc = require('electron').ipcMain
const fs = require('fs');
const { exec } = require('child_process');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
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
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();	
	}
});

const repoPath = "/home/david/Documents/dotnetfunfacts";

class Fact {
	public Title: string;
	public Url: string;
	public Contributors: string;
	public Tags: string;
	public Body: string;
}

function printFact(fact: Fact) {
	var dateString: string = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`

	return `!meta

title:${fact.Title}
url:${fact.Url}
contributors:${fact.Contributors}
created:${dateString}
modified:${dateString}
tags:${fact.Tags}

!endmeta
${fact.Body}
`;
}

ipc.on("create-fact", (event, args: Fact) => {
	fs.writeFile(repoPath + "/facts/" + args.Url + ".md", printFact(args), function (err: any) {
		console.log(err);
	});
});

ipc.on("publish", () => {
	publish();
});

function publish () {
	exec("./scripts/publish.sh", { cwd: repoPath}, () => { console.log("done"); });
}