# electron-promise-extra

Promise based IPC Library in Electron

## Installation

```sh
$ npm install electron-promise-extra --save
```

## Usage

```js
import ipc from 'electron-ipc-extra'

ipc.on('channel', listener)
```

#### Removing Listeners

```js
import ipc from 'electron-ipc-extra'

ipc.off('channel')
```

## Features

- Promise bases API, use async / await
- Always send to all browserWindows from main process, forget the webContents
- Keep the raw event object
- Electron-compatible API and no need to care about Renderer or Main Process
- Work fine with electron-build (no peerDependencies limit)

## Debug with Devtron

## Doc

- [Electron ipcMain](https://electronjs.org/docs/api/ipc-main)
- [Electron ipcRenderer](https://electronjs.org/docs/api/ipc-renderer)

## License

MIT
