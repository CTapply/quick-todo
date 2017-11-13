/* eslint-disable */
const { app, Menu, Tray, BrowserWindow, globalShortcut } = require('electron');

const path = require('path');
const url = require('url');

const assetsDirectory = path.join(__dirname, 'assets');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray = null;

function createTray() {
  tray = new Tray(path.join(assetsDirectory, 'icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // useContentSize: true,
    width: 550,
    height: 800,
    frame: false,
    // titleBarStyle: 'hidden',
    transparent: true,
    show: false,
    // vibrancy: 'dark',
    // alwaysOnTop: true,
  });

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}


function registerGlobalShortcut() {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('Control+Alt+X', () => {
    console.log('Control+Alt+X is pressed');
  })

  if (!ret) {
    console.log('registration failed');
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('Control+Alt+X'));
}


app.on('ready', () => {
  createTray();
  createWindow();
  registerGlobalShortcut();
});
// app.dock.hide();

app.on('will-quit', () => {
  // // Unregister a shortcut.
  // globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
