const { Menu } = require("electron");

const template = [
  {
    label: "File",
    submenu: [
      { label: "Open", click: () => console.log("Open Clicked") },
      { label: "Exit", role: "quit" }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
