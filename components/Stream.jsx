import * as io from 'socket.io-client'

const { useRef, useEffect, useState } = React

export default function Stream({ roomID, className, style }) {
  const localStream = useRef()
  const socketRef = useRef()
  const remoteUser = useRef()
  const remoteVideo = useRef()
  const rtcPeerConnection = useRef()

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
      socketRef.current = io.connect(
        'https://hmxrc-mwpxmcbb-9ugtqt4ndwm6bnf.herokuapp.com/'
      )

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
        rtcPeerConnection.current = createPeerConnection()
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
      volume={0.2}
      ref={remoteVideo}
      className={className}
      style={style}
    />
  )
}
