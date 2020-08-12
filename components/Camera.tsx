import * as React from 'react'

const { useRef, useEffect, useState } = React

type Props = {
  style?: any
  poster?: any
  className?: string
}

const CAPTURE_OPTIONS = { audio: false, video: true }

const Camera: React.FC<Props> = ({ style, poster, className }) => {
  const videoRef = useRef(null)
  const mediaStream = useUserMedia(CAPTURE_OPTIONS)

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream
  }

  function handleCanPlay() {
    videoRef.current.play()
  }

  return (
    <video
      ref={videoRef}
      onCanPlay={handleCanPlay}
      autoPlay
      playsInline
      muted
      style={style}
      poster={poster}
      className={className}
    />
  )
}

export default Camera

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
