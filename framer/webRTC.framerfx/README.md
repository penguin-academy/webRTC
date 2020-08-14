# Overview

This package contains a set of connective components that work with the cameras on your device. Using the default config settings you can quickly setup a real time video call from your prototype.

## Warnings and Compatibility

_This is an early preview of the package. Be aware that things might change._

This package will never show video while opened in Framer Desktop.

The current platform support out of the box is for Brave, Chrome and Firefox on Windows, MacOs and Android!

**iOS Support**: You can also make video calls work on Safari (MacOS and iOS!) - therefore you will have to open your prototype in Framer Desktop and export as HTML. Upload the exported folder any hosting provder (extremely easy with netlify: just drag and drop) and it will work.

Package is not tested in Edge and Opera but you might be lucky.

## Usage

The main component is **Stream**. Use this component to see the partner's video and to stream your video to the partner.

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
