import * as React from 'react'
import * as io from 'socket.io-client'

const { useRef, useEffect, useState } = React

type Props = {
  style?: any
  className?: string
  roomID: string
  server: string
}

const Stream: React.FC<Props> = ({ roomID, className, style, server }) => {
  const localStream = useRef<any>()
  const socketRef = useRef<any>()
  const remoteUser = useRef<any>()
  const remoteVideo = useRef<HTMLVideoElement>(null)
  const rtcPeerConnection = useRef<any>()

  const [mediaStream, setMediaStream] = useState(null)
  const onUnload = async () => {
    console.log(roomID)
    await socketRef.current.emit('disconnect', roomID)
  }
  useEffect(() => {
    window.addEventListener('beforeunload', onUnload)
    async function enableStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        })
        setMediaStream(stream)
      } catch (err) {
        console.log(err)
      }
    }

    if (!mediaStream) {
      enableStream()
    } else {
      console.log('connect')
      localStream.current = mediaStream
      socketRef.current = io.connect(server)

      socketRef.current.emit('start call', roomID)

      socketRef.current.on('call partner', partnerID => {
        console.log('call partner')
        rtcPeerConnection.current = createPeerConnection(partnerID)
        localStream.current
          .getTracks()
          .forEach(track =>
            rtcPeerConnection.current.addTrack(track, localStream.current)
          )
        remoteUser.current = partnerID
      })

      socketRef.current.on('call host', hostID => {
        console.log('call host')
        remoteUser.current = hostID
      })

      socketRef.current.on('offer', incomingOffer => {
        console.log('offer')
        rtcPeerConnection.current = createPeerConnection(null)
        rtcPeerConnection.current
          .setRemoteDescription(new RTCSessionDescription(incomingOffer.sdp))
          .then(() => {
            localStream.current
              .getTracks()
              .forEach(track =>
                rtcPeerConnection.current.addTrack(track, localStream.current)
              )
          })
          .then(() => {
            return rtcPeerConnection.current.createAnswer()
          })
          .then(answer => {
            return rtcPeerConnection.current.setLocalDescription(answer)
          })
          .then(() => {
            const payload = {
              target: incomingOffer.caller,
              caller: socketRef.current.id,
              sdp: rtcPeerConnection.current.localDescription,
            }

            socketRef.current.emit('answer', payload)
          })
      })

      socketRef.current.on('answer', payload => {
        console.log('answer')
        rtcPeerConnection.current.setRemoteDescription(
          new RTCSessionDescription(payload.sdp)
        )
      })

      socketRef.current.on('ice-candidate', incomingCandidate => {
        console.log('ice-candidate')
        rtcPeerConnection.current.addIceCandidate(
          new RTCIceCandidate(incomingCandidate)
        )
      })
    }
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [mediaStream])

  function createPeerConnection(userID) {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org',
        },
      ],
    })

    peerConnection.onnegotiationneeded = () => {
      rtcPeerConnection.current
        .createOffer()
        .then(offer => {
          return rtcPeerConnection.current.setLocalDescription(offer)
        })
        .then(() => {
          const payload = {
            target: userID,
            caller: socketRef.current.id,
            sdp: rtcPeerConnection.current.localDescription,
          }

          socketRef.current.emit('offer', payload)
        })
        .catch(e => console.log(e))
    }

    peerConnection.onicecandidate = e => {
      if (e.candidate) {
        const payload = {
          target: remoteUser.current,
          candidate: e.candidate,
        }

        socketRef.current.emit('ice-candidate', payload)
      }
    }

    peerConnection.ontrack = e => {
      if (mediaStream && remoteVideo.current) {
        remoteVideo.current.srcObject = e.streams[0]
      }
    }

    return peerConnection
  }

  return (
    <video
      autoPlay
      // volume={0.2}
      ref={remoteVideo}
      className={className}
      style={style}
    />
  )
}

export default Stream