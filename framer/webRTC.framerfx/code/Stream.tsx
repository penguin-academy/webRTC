import * as React from 'react'

import { addPropertyControls, ControlType, RenderTarget } from 'framer'

import StreamComponent from '../../../components/Stream.tsx'

const { useRef, useEffect, useState } = React

const CAPTURE_OPTIONS = {
  audio: true,
  video: { width: 1280, height: 640 },
}

export function Stream(props) {
  const mediaStream = useUserMedia(CAPTURE_OPTIONS)
  props.onStream(mediaStream)

  const borderRadius = props.mixedRadius
    ? `${props.topLeft}px ${props.topRight}px ${props.bottomRight}px ${props.bottomLeft}px`
    : `${props.radius}px`
  const style = {
    width: '100%',
    height: '100%',
    backgroundColor: props.color || null,
    borderRadius,
  }

  if (RenderTarget.current() === RenderTarget.thumbnail) {
    return <div style={style} />
  }

  return (
    <StreamComponent
      roomID={props.roomID}
      style={{ ...style, objectFit: props.cover ? 'cover' : 'contain' }}
      server={props.server}
      mediaStream={mediaStream}
    />
  )
}

Stream.defaultProps = {
  onStream: () => null,
}

addPropertyControls(Stream, {
  image: {
    title: 'Placeholder',
    type: ControlType.Image,
  },
  color: {
    title: 'Fill',
    type: ControlType.Color,
    defaultValue: '#AEC3D0',
  },
  cover: {
    title: 'Cover',
    type: ControlType.Boolean,
    defaultValue: true,
  },
  radius: {
    type: ControlType.FusedNumber,
    title: 'Radius',
    defaultValue: 0,
    toggleKey: 'mixedRadius',
    toggleTitles: ['All', 'Individual'],
    valueKeys: ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'],
    valueLabels: ['TL', 'TR', 'BR', 'BL'],
    min: 0,
  },
  server: {
    type: ControlType.String,
    title: 'Server',
    defaultValue: 'https://penguin-signaling-server.herokuapp.com/',
  },
  roomID: {
    type: ControlType.String,
    title: 'Room ID',
    defaultValue: (Math.random() * 10000000).toString(),
  },
})

function useUserMedia(requestedMedia) {
  const [mediaStream, setMediaStream] = useState(null)

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(requestedMedia)
        setMediaStream(stream)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      return function cleanup() {
        mediaStream.getTracks().forEach(track => {
          track.stop()
        })
      }
    }
  }, [mediaStream, requestedMedia])

  return mediaStream
}
