<template>
  <video
    ref="videoEl"
    poster="../../assets/live-stream.png"
    autoplay
    muted
  ></video>
</template>

<script>
import { ref } from '@vue/reactivity'
import socket from '../../lib/websocket'
import WebRTC from '../../lib/webRTC'
import { onBeforeUnmount, onMounted } from '@vue/runtime-core'
export default {
  name: 'Stream',
  setup() {
    const videoEl = ref(null)
    const webRTC = new WebRTC()

    webRTC.createConnection()

    socket.on('webrtc-topic', async (data) => {
      if (data.type === 'offer') {
        await webRTC.setRemoteSDP(data.payload)
        const answer = await webRTC.createAnswerAndSetLocalSDP()
        socket.emit('send-webrtc', { type: 'answer', payload: answer })
      }

      if (data.type === 'candidate') {
        await webRTC.addCandidate(data.payload)
      }
    })

    onMounted(async () => {
      const handleOnIceCnadidate = ({ candidate }) => {
        if (candidate) {
          socket.emit('send-webrtc', { type: 'candidate', payload: candidate })
        }
      }
      const handleOnTrack = (event) => {
        if (event.track.kind === 'video') {
          videoEl.value.srcObject = event.streams[0]
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

    return {
      videoEl
    }
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
