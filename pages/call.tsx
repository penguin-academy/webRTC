import * as React from 'react'

import Link from 'next/link'
import Camera from '../components/Camera'
import Stream from '../components/Stream'

const SERVER_URL = 'https://penguin-signaling-server.herokuapp.com/'

const { useEffect, useState } = React
const CAPTURE_OPTIONS = {
  audio: true,
  video: { width: 1280, height: 640 },
}

const Call = () => {
  const [roomID, setRoomID] = useState('')
  const mediaStream = useUserMedia(CAPTURE_OPTIONS)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const room = urlParams.get('room')
    if (!room) alert('Invalid room ID.')
    setRoomID(room)
  }, [])

  return (
    <>
      <div className='m-10'>
        <div className='flex justify-between'>
          <div>
            <h1 className='text-3xl font-bold'>Video Call</h1>
            <span className='text-gray-500 font-xl'>Room: {roomID}</span>
          </div>
          <span className='block mb-4 sm:ml-2 sm:inline-block'>
            <Link href='/'>
              <a className='font-bold underline'>&larr; Back</a>
            </Link>
          </span>
        </div>
      </div>
      <div className='m-10 md:flex md:items-end'>
        <div className='md:w-8/12'>
          <Stream
            roomID={roomID}
            className='rounded-lg'
            mediaStream={mediaStream}
            server={SERVER_URL}
          />
        </div>
        <div className='max-w-xs mt-8 md:ml-8 md:w-3/12 md:mt-0 md:max-w-none'>
          <Camera
            className='rounded-lg'
            mediaStream={mediaStream}
            style={{ transform: 'rotateY(180deg)' }}
          />
        </div>
      </div>
    </>
  )
}

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

export default Call
