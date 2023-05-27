// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, globalShortcut} = require('electron');
const windowConfig = require('./configs/window');
const {search, generateStringToSearch } = require('./domain/search');

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const browserWindow = windowConfig.createWindow();
  const applicationState = {};
  applicationState.book = 'gn';
  applicationState.chapterNumber = 1;
  applicationState.verseNumber = 1;

  const setState = (data) => {
    applicationState.book = data.currentBook;
    applicationState.chapterNumber = data.currentChapter;
    applicationState.verseNumber = data.currentVerse;
  };

  browserWindow.webContents.on('did-finish-load', async () => {
    const firstContentRender = await search(generateStringToSearch(applicationState));
    browserWindow.webContents.send('render-event', firstContentRender);

    /**
     * Listener the "search-event" (search bar) make the search in JSON and throw
     * a render event to show in HTML
     */
    ipcMain.handle('search-event', async (event, eventData) => {
      const dataToRender = await search(eventData);

      setState(dataToRender.index);
      browserWindow.webContents.send('render-event', dataToRender);
    });

    ipcMain.handle('next-event', async (event, eventData) => {
      applicationState.verseNumber = Number(applicationState.verseNumber) + 1;
      const dataToRender = await search(generateStringToSearch(applicationState));
  
      if (applicationState.verseNumber >= dataToRender.index.verseMaxNumber) {
        applicationState.book = dataToRender.index.nextBook;
        applicationState.chapterNumber = 1;
        applicationState.verseNumber = 0;
      }

      browserWindow.webContents.send('render-event', dataToRender);
    });

    /**
     * TODO 1: make the search bar open and close by shortcuts  
     */
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
