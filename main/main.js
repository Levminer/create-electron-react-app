const { error } = require("console")
const { BrowserWindow, app, ipcMain, Notification } = require("electron")
const path = require("path")

const isDev = !app.isPackaged

function createWindow() {
	const window = new BrowserWindow({
		width: 1200,
		height: 800,
		minHeight: 400,
		minWidth: 800,
		backgroundColor: "black",
		webPreferences: {
			nodeIntegration: false,
			worldSafeExecuteJavaScript: true,
			contextIsolation: true,

			preload: path.join(__dirname, "preload.js"),
		},
	})

	window.loadFile(path.join(__dirname, "../resources/index.html"))

	window.on("close", () => {
		app.exit()
	})
}

if (isDev) {
	require("electron-reload")(path.join(__dirname, "/.././"), {
		electron: path.join(__dirname, "/.././", "node_modules", ".bin", "electron"),
	})
}

ipcMain.on("notify", (_, message) => {
	new Notification({ title: "Notifiation", body: message }).show()
})

app.whenReady().then(() => {
	createWindow()
})
