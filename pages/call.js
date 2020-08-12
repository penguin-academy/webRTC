import Link from 'next/link'
import Camera from '../components/Camera'
import Stream from '../components/Stream'

const { useEffect, useState } = React
const Call = () => {
  const [roomID, setRoomID] = useState()

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
            <h1 className='font-bold text-3xl'>Video Call</h1>
            <span className='font-xl text-gray-500'>Room: {roomID}</span>
          </div>
          <span className='block mb-4 sm:ml-2 sm:inline-block'>
            <Link href='/'>
              <a className='font-bold underline'>&larr; Back</a>
            </Link>
          </span>
        </div>
      </div>
      <div className='md:flex m-10 md:items-end'>
        <div className='md:w-8/12'>
          <Stream roomID={roomID} className='rounded-lg' />
        </div>
        <div className='md:ml-8 md:w-3/12 mt-8 md:mt-0 max-w-xs md:max-w-none'>
          <Camera className='rounded-lg' />
        </div>
      </div>
    </>
  )
}

export default Call
