const electron = require('electron')
const uuid = require('uuid/v1')
const serializeError = require('serialize-error')

class BaseIPC {
  constructor(kind, ipc) {
    this.kind = kind
    this.ipc = ipc
    this.version = '1.2.4'
  }

  send(channel, ...args) {
    const eventId = uuid()
    const replyChannel = this.getReplyChannel(channel, eventId)
    return new Promise((resolve, reject) => {
      this.ipc.once(replyChannel, async (event, opt, ...args) => {
        if (opt && opt.status === 'ok') {
          resolve(...args)
        } else {
          reject(...args)
        }
      })
      if (this.kind === 'renderer') {
        // renderer => main
        this.ipc.send(channel, { eventId }, ...args)
      } else {
        // main => renderer, send to all browserWindows
        const winList = electron.BrowserWindow.getAllWindows()
        for (let win of winList) {
          let { webContents } = win
          webContents.send(channel, {
            eventId,
            webContentsId: webContents.id
          }, ...args)
        }
      }
    })
  }

  sendToWebContents(webContents, channel, ...args) {
    const eventId = uuid()
    const replyChannel = this.getReplyChannel(channel, eventId)
    return new Promise((resolve, reject) => {
      this.ipc.once(replyChannel, async (event, opt, ...args) => {
        if (opt && opt.status === 'ok') {
          resolve(...args)
        } else {
          reject(...args)
        }
      })
      // main => renderer, send to single webContents
      webContents.send(channel, {
        eventId,
        webContentsId: webContents.id
      }, ...args)
    })
  }

  on(channel, listener) {
    this.ipc.on(channel, async (event, opt, ...args) => {
      opt = opt || {}
      const replyChannel = this.getReplyChannel(channel, opt.eventId)
      try {
        var res = await listener.call(Object.assign({ event }, opt), ...args)
      } catch (err) {
        err = serializeError(err)
        event.sender.send(replyChannel, Object.assign({ status: 'error' }, opt), err)
        return
      }
      event.sender.send(replyChannel, Object.assign({ status: 'ok' }, opt), res)
    })
  }

  off(channel, listener) {
    if (listener) {
      // TODO not finish, need map
      this.ipc.removeListener(channel, listener)
    } else {
      this.ipc.removeAllListeners(channel)
    }
  }

  getReplyChannel(channel, eventId = '') {
    return `${channel}#${eventId}`
  }
}

module.exports = BaseIPC
