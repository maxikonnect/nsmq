const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

// Determine the path for data.json
const dataFilePath = path.join(app.getPath("userData"), "data.json");

// Ensure data.json exists
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]), "utf8");
}

// Function to read data.json
function readData() {
    try {
        return JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    } catch (error) {
        console.error("Error reading data.json:", error);
        return [];
    }
}

// Function to write data to data.json
function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    } catch (error) {
        console.error("Error writing to data.json:", error);
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"), // Secure IPC
            nodeIntegration: false,
        },
    });

    mainWindow.loadFile(path.join(__dirname, "../../views/index.html")); // Load UI
}

app.whenReady().then(createWindow);

const template = [
    {
        label: "Edit",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
        ],
    },
    {
        label: "View",
        submenu: [
            { role: "reload" },
            { role: "toggledevtools" },
            { type: "separator" },
            { role: "resetzoom" },
            { role: "zoomin" },
            { role: "zoomout" },
            { type: "separator" },
            { role: "togglefullscreen" },
        ],
    },
    {
        role: "window",
        submenu: [{ role: "minimize" }, { role: "close" }],
    },
    {
        role: "help",
        submenu: [{ label: "Learn More", click: () => console.log("Help Clicked!") }],
    },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// Example usage: Read data on startup
const existingData = readData();
console.log("Existing Data:", existingData);

// Example usage: Write new data
writeData([...existingData, { id: 1, name: "New Entry" }]);
