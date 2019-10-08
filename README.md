# electron-ipc-extra

:dart: A Better Promise based IPC Library in Electron

## Features

- Promise based API, write with `async / await` simply
- Send a message and get the response back in the same call
- Same Api in Renderer and Main Process, Electron-compatible api design
- Always send to all browserWindows from main process, forget the webContents
- Keep the raw event object just in case
- Work fine with [electron-builder](https://github.com/electron-userland/electron-builder) (no peerDependencies limit)

## Installation

```sh
$ npm install electron-ipc-extra --save
```

## Usage

```js
// in renderer or main process
import ipc from 'electron-ipc-extra'

ipc.on('channel-name', async (...args) => {
  await getSomeData()
  return 'reply data'
})
```

```js
// in main or renderer process
import ipc from 'electron-ipc-extra'

let data = await ipc.send('channel-name', 'some data', 'another data')
console.log('data') // => 'reply data'
```

#### Get original `event` object

```js
ipc.on('ondragstart', async function(...args) {
  var { event } = this
  event.sender.startDrag({
    file: 'some file',
    icon: 'some native image'
  })
  return 'reply data'
})
```

#### Removing Listeners

```js
import ipc from 'electron-ipc-extra'

ipc.off('channel-name')
```

## Debug IPC data

Install [Devtron](https://electronjs.org/devtron)

![](https://user-images.githubusercontent.com/4565306/58407720-0bf0da00-809f-11e9-9a79-ea2202d9421b.png)

## Reference Doc

- [Electron ipcMain](https://electronjs.org/docs/api/ipc-main)
- [Electron ipcRenderer](https://electronjs.org/docs/api/ipc-renderer)

## License

MIT
