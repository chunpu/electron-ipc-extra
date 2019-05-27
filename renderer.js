const electron = require('electron')
const BaseIPC = require('./base')
const { ipcRenderer } = electron

class RenderIPC extends BaseIPC {
  constructor() {
    super('renderer', ipcRenderer)
  }

  send(...args) {
    return super.send(...args)
  }

  on(...args) {
    return super.on(...args)
  }
}

module.exports = new RenderIPC()
