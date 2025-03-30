const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getData: () => ipcRenderer.invoke("get-data"),
  addItem: (item) => ipcRenderer.send("add-item", item),
  editItem: (index, item) => ipcRenderer.send("edit-item", index, item),
  deleteItem: (index) => ipcRenderer.send("delete-item", index),
});
