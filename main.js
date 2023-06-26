const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const config = {
    width: 1366,
    height: 768,
    useContentSize: true
  }

  const win = new BrowserWindow(config)

  win.removeMenu()
  win.setAspectRatio(16 / 9)
  win.loadFile('build/web-mobile/index.html')
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})