const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundMaterial: 'acrylic',
    backgroundColor: "#50000000",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  mainWindow.loadFile('templates/dashboard.html'); // 'templates/dashboard.html'

    mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    // redraw window to load transparency
    const [width, height] = mainWindow.getSize();
    mainWindow.setSize(width + 1, height + 1);
    mainWindow.setSize(width, height);
    });
}

ipcMain.on('window-control', (event, action) => {
  switch (action) {
    case 'close':
      mainWindow.close();
      break;
    case 'minimize':
      mainWindow.minimize();
      break;
    case 'maximize':
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
      break;
  }
});

app.whenReady().then(createWindow);
