<template>
  <video poster="../../assets/live-stream.png" muted autoplay></video>
</template>

<script>
import socket from '../../lib/websocket'
import WebRTC from '../../lib/webRTC'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'Stream',
  setup() {
    const store = useStore()
    const webRTC = new WebRTC()

    const setLogs = (log) => store.dispatch('setLogs', log)

    webRTC.createConnection()

    socket.on('webrtc-topic', async (data) => {
      if (data.type === 'offer') {
        await webRTC.setRemoteSDP(data.payload)
        setLogs('Recieved offer')
        const answer = await webRTC.createAnswerAndSetLocalSDP()
        setLogs('Send answer')
        socket.emit('send-webrtc', { type: 'answer', payload: answer })
      }

      if (data.type === 'candidate') {
        setLogs('Recieved candidate')
        await webRTC.addCandidate(data.payload)
      }
    })

    onMounted(async () => {
      const handleOnIceCnadidate = ({ candidate }) => {
        if (candidate) {
          setLogs('Send candidate')
          socket.emit('send-webrtc', { type: 'candidate', payload: candidate })
        }
      }
      const handleOnTrack = (event) => {
        if (event.track.kind === 'video') {
          setLogs('Recieved track')
          document.querySelector('video').srcObject = event.streams[0]
        }
      }

      webRTC.setIceCandidateListener(handleOnIceCnadidate)
      webRTC.setTrackListener(handleOnTrack)
      await webRTC.getLocalStream()
      webRTC.addTrackToConnection()
    })

    onBeforeUnmount(() => {
      webRTC.stopStream()
    })
  }
}
</script>

<style lang="scss" scoped>
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
