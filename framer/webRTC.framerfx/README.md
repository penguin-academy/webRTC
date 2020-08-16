# Overview

This package contains a set of connective components that work with the cameras on your device. Using the default config settings you can quickly setup a real time video call from your prototype.

This component works out-of-the-box.

This project is part of a free and open source project "[webRTC made Simple](https://webrtc.penguin.academy)".

| value | type | default | description |
| --- | --- | --- | --- |
| Placeholder | Image | none | Placeholder image. Will only show in Framer while working on the prototype. Will not show when you run the prototype. |
| Fill | Color | #AEC3D0 | Background color that shows as a placeholder for the video. Will also show during the call while there is no video available. |
| Cover | boolean | true | true fills the element’s entire content box (and will crop into the video), false will ensure the whole video is shown |
| Radius | FusedNumber | 0 | Border Radius for the video |
| Server | string | https://penguin-signaling-server.herokuapp.com/ | URL to the video server. You can use our freely available server without guarantee or change it to your own server. |
| RoomID | string | randomly generated number | This ID is used to match the two participants of the call. You can create another prototype that uses the same ID and both participants will be connected or you can send them a link to our web app: https://webrtc.penguin.academy/call?room=\<id\>, replace \<id\> with the value in this field. |

## Warnings and Compatibility

_This is an early preview of the package. Be aware that things might change._

This package will never show video while opened in Framer Desktop.

The current platform support out of the box is for Brave, Chrome and Firefox on Windows, MacOs and Android!

**iOS Support**: You can also make video calls work on Safari (MacOS and iOS!) - therefore you will have to open your prototype in Framer Desktop and export as HTML. Upload the exported folder any hosting provder (extremely easy with netlify: just drag and drop) and it will work.

Package is not tested in Edge and Opera but you might be lucky.

## Usage

The main component is **Stream**. Use this component to see the partner's video and to stream your video to the partner.

This component has a number of settings you can configure on the component.

There is a second component **Camera**. This is for showing a preview (mirror) of your device camera to see what you are streaming. To use the Camera component, you need to add the CameraBridge Overwrite (code below). This is to work around a bug on iOS.

Here’s the code for the overwrite. Save this as "CameraBridge.tsx" and select "showStream" as overwrite on the Camera component and "Stream" as overwrite on the Stream component.

```typescript
import * as React from 'react'
import { Override, Data } from 'framer'

const appState = Data({
  stream: null,
})

export function Stream(props): Override {
  return {
    onStream: stream => {
      appState.stream = stream
    },
  }
}

export function showStream(props): Override {
  return {
    stream: appState.stream,
  }
}
```

Additionally you can also cancel the

## API

You can pass functions to the "Stream" component to receive access to the stream objects.

The local video stream:

```
onStream: stream => {}
```

The remote video stream:

```
onRemoteStream: remoteStream => {}
```

### Examples

You can see example usage in the code above under usage.

Here is another example - this one creates a secon Override `stopStream` that you can apply to the button that ends the call.

```
import * as React from "react"
import { Override, Data } from "framer"

const appState = Data({
    stream: null,
    remoteStream: null,
})

export function Stream(props): Override {
    return {
        onStream: (stream) => {
            appState.stream = stream
        },
        onRemoteStream: (stream) => {
            appState.remoteStream = stream
        },
    }
}

export function stopStream(props): Override {
    return {
        onTap: () => {
            if (appState.stream)
                (appState.stream as any)
                    .getTracks()
                    .forEach((track) => track.stop())
            if (appState.stream)
                (appState.remoteStream as any)
                    .getTracks()
                    .forEach((track) => track.stop())
        },
    }
}

```

## Bugs and Collaboration

If you have feature requests or you encounter a bug, feel free to open an issue on GitHub at [github.com/penguin-academy/webrtc](https://github.com/penguin-academy/webrtc).

We welcome your contribution to this project!

## Authors and License

You can use this plugin for free.

This WebRTC resource was created by the amazing people of Penguin Academy. Code is available under MIT License.

This project was created as part of the iHub COVID-19 project of PTI (Parque Tecnológico Itaipu Paraguay).

© 2020 Penguin Business, Inc. All rights reserved.
