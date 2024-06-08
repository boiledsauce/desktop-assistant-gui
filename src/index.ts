import { app, BrowserWindow, session } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = "default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; " +
      "connect-src 'self' " +
      "http://172.17.162.1:8081 " +  // Make sure the IP and port are correct
      "ws://localhost:3000 " +
      "http://172.22.96.1:8080 " +
      "http://127.0.0.1:8080 " +
      "http://192.168.1.5:8080 " +
      "http://127.0.0.1:8081;";  // End of connect-src, notice the semicolon to end the directive

    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp],
      },
    });
  });

  createWindow();
});

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