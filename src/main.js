// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const windowConfig = require('./configs/window');
const search = require('./domain/search');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const browserWindow = windowConfig.createWindow();

  browserWindow.webContents.on('did-finish-load', () => {
    /**
     * Listener the "search-event" make the search in JSON and throw
     * a render event to show in HTML
     */
    ipcMain.handle('search-event', async (event, eventData) => {
      const dataToRender = await search(eventData);
      browserWindow.webContents.send('render-event', dataToRender);
    });

    globalShortcut.register('Alt+CommandOrControl+I', () => {
      console.log('Electron loves global shortcuts!');
    });
  });

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});
