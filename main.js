const electron = require('electron')
const BaseIPC = require('./base')
const { ipcMain } = electron

class MainIPC extends BaseIPC {
  constructor() {
    super('main', ipcMain)
  }

  send(...args) {
    return super.send(...args)
  }

  on(...args) {
    return super.on(...args)
  }

  sendToWebContents(...args) {
    return super.sendToWebContents(...args)
  }
}

module.exports = new MainIPC()
