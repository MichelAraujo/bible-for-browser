const {BrowserWindow} = require('electron');
const path = require('path');

/**
 * This function is to config and create a browser window
 *
 * @return {object} BrowserWindow
 */
const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // load the index.html of the app.
  mainWindow.loadFile('src/view/main.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  return mainWindow;
};

module.exports = {
  createWindow,
};
