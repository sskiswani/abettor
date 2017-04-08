import * as electron from 'electron';
import { BrowserWindow } from 'electron';

// Module to control application life.
const app = electron.app;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow;

function createWindow() {
   mainWindow = new BrowserWindow({ width: 1200, height: 800 });
   mainWindow.loadURL('http://localhost:9001/');
   mainWindow.webContents.openDevTools();

   mainWindow.on('closed', () => {
      mainWindow = null;
   });
}

app.on('ready', createWindow);

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
   if (mainWindow === null) {
      createWindow();
   }
});
