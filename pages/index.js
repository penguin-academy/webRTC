import Head from 'next/head'
import Footer from '../components/Footer'

const { useState } = React

export default function Home() {
  const [roomID, setRoomID] = useState('')
  const [error, setError] = useState(false)
  return (
    <>
      <Head>
        <title>WebRTC - Penguin Academy</title>
      </Head>

      <div className='relative bg-gray-50 overflow-hidden'>
        <div className='relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32'>
          <main className='mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28'>
            <div className='text-center'>
              <h2 className='text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl'>
                WebRTC&nbsp;
                <br className='xl:hidden' />
                <span className='text-indigo-600'>made simple</span>
              </h2>
              <p className='mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl'>
                We created a webRTC solution for you, completely open-source,
                easy to use and handy tutorials so you can learn how to get
                started.
              </p>
              <div className='mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8'>
                <input
                  aria-label='Room id'
                  type='email'
                  required
                  className='appearance-none px-5 py-3 text-base leading-6 rounded-md shadow text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out'
                  placeholder='Enter room id e.g. xLw12'
                  onChange={e => {
                    setError(false)
                    setRoomID(e.target.value)
                  }}
                />
                <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
                  <button
                    onClick={() => {
                      if (!roomID) return setError(true)
                      window.location.href = `/call?room=${roomID}`
                    }}
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10'
                  >
                    Live demo
                  </button>
                </div>
              </div>
              {error ? (
                <div class='mt-4'>
                  <p class='leading-5 text-red-500'>Please enter a room ID!</p>
                </div>
              ) : (
                ''
              )}
            </div>

            <div className='bg-gray-50 overflow-hidden mt-40'>
              <div className='relative max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
                <svg
                  className='absolute top-0 left-full transform -translate-x-1/2 -translate-y-3/4 lg:left-auto lg:right-full lg:translate-x-2/3 lg:translate-y-1/4'
                  width={404}
                  height={784}
                  fill='none'
                  viewBox='0 0 404 784'
                >
                  <defs>
                    <pattern
                      id='8b1b5f72-e944-4457-af67-0c6d15a99f38'
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits='userSpaceOnUse'
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className='text-gray-200'
                        fill='currentColor'
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={784}
                    fill='url(#8b1b5f72-e944-4457-af67-0c6d15a99f38)'
                  />
                </svg>
                <div className='relative lg:grid lg:grid-cols-3 lg:col-gap-8'>
                  <div className='lg:col-span-1'>
                    <h3 className='text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10'>
                      Secure, P2P, dezentralized communication for the 21st
                      century.
                    </h3>
                  </div>
                  <div className='mt-10 sm:grid sm:grid-cols-2 sm:col-gap-8 sm:row-gap-10 lg:col-span-2 lg:mt-0'>
                    <div>
                      <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                        <svg
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                          />
                        </svg>
                      </div>
                      <div className='mt-5'>
                        <h4 className='text-lg leading-6 font-medium text-gray-900'>
                          Browsers
                        </h4>
                        <p className='mt-2 text-base leading-6 text-gray-500'>
                          <a
                            href="javascript:alert('coming soon');"
                            className='text-blue-600 underline'
                          >
                            This tutorials
                          </a>{' '}
                          walks you through every step to setup WebRTC in the
                          browser.
                          <br />
                          <a
                            href='http://github.com/penguin-academy/webrtc'
                            className='text-blue-600 underline'
                          >
                            This GitHub repository
                          </a>
                          &nbsp;contains the sources for above demo - video
                          calling in the browser.
                        </p>
                      </div>
                    </div>
                    <div className='mt-10 sm:mt-0'>
                      <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                        <svg
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
                          />
                        </svg>
                      </div>
                      <div className='mt-5'>
                        <h4 className='text-lg leading-6 font-medium text-gray-900'>
                          Native Apps (Flutter)
                        </h4>
                        <p className='mt-2 text-base leading-6 text-gray-500'>
                          <a
                            href="javascript:alert('coming soon');"
                            className='text-blue-600 underline'
                          >
                            This tutorial
                          </a>{' '}
                          will show you, how to make WebRTC work within a
                          flutter app.
                        </p>
                      </div>
                    </div>
                    <div className='mt-10 sm:mt-0'>
                      <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                        <svg
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M13 10V3L4 14h7v7l9-11h-7z'
                          />
                        </svg>
                      </div>
                      <div className='mt-5'>
                        <h4 className='text-lg leading-6 font-medium text-gray-900'>
                          Framer (Prototyping)
                        </h4>
                        <p className='mt-2 text-base leading-6 text-gray-500'>
                          Install this plugin in framer to make real calls
                          within your prototype!
                        </p>
                      </div>
                    </div>
                    <div className='mt-10 sm:mt-0'>
                      <div className='flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                        <svg
                          className='h-6 w-6'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                      <div className='mt-5'>
                        <h4 className='text-lg leading-6 font-medium text-gray-900'>
                          Signaling Server
                        </h4>
                        <p className='mt-2 text-base leading-6 text-gray-500'>
                          All parts require a signaling server to work. You can
                          either write your own by following{' '}
                          <a
                            href="javascript:alert('coming soon');"
                            className='text-blue-600 underline'
                          >
                            this tutorial
                          </a>{' '}
                          or download{' '}
                          <a
                            href='https://github.com/penguin-academy/webRTC-signaling-server'
                            className='text-blue-600 underline'
                          >
                            the server here
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}
