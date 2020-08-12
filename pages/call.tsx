import * as React from 'react'

import Link from 'next/link'
import Camera from '../components/Camera'
import Stream from '../components/Stream'

const SERVER_URL = 'http://penguin-signaling-server.herokuapp.com/'

const { useEffect, useState } = React
const Call = () => {
  const [roomID, setRoomID] = useState('')

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
          <Stream roomID={roomID} className='rounded-lg' server={SERVER_URL} />
        </div>
        <div className='max-w-xs mt-8 md:ml-8 md:w-3/12 md:mt-0 md:max-w-none'>
          <Camera className='rounded-lg' />
        </div>
      </div>
    </>
  )
}

export default Call
