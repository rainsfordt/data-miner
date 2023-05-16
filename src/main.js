const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    kiosk: false,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        //nodeIntegration: true,
      },
  });
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('./src/index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
