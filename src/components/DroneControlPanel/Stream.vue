<template>
  <div class="video-wrapper">
    <video
      class="local"
      autoplay
      muted
      poster="@/assets/local-user.png"
    />
    <video
      class="remote"
      autoplay
      poster="@/assets/live-streaming.png"
    />
  </div>
</template>

<script>
import { useWebrtc, socket } from '../../utils'
import { computed, onBeforeUnmount, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'Stream',
  setup () {
    const store = useStore()
    const userInfo = computed(() => store.getters['User/getUserInfo'])
    let stream
    socket.emit('joinRoom', userInfo.value.droneId)

    const pc = useWebrtc.createPeerConnection()
    pc.addEventListener('icecandidate', ({ candidate }) => {
      if (candidate) socket.emit('sendCandidate', candidate)
    })
    pc.addEventListener('track', event => {
      document.querySelector('.remote').srcObject = event.streams[0]
    })

    socket.on('offer', async offer => {
      await pc.setRemoteDescription(offer)
      const answer = await pc.createAnswer()
      await pc.setLocalDescription(answer)
      socket.emit('sendAnswer', answer)
    })

    socket.on('candidate', candidate => pc.addIceCandidate(candidate))

    onMounted(async () => {
      stream = await useWebrtc.getLocalMedia()
      document.querySelector('.local').srcObject = stream
      stream.getTracks().forEach(track => pc.addTrack(track, stream))
    })

    onBeforeUnmount(() => {
      stream.getTracks().forEach(track => track.stop())
    })
  }

}
</script>

<style lang="scss" scoped>
.video-wrapper{
  position: relative;
  .remote {
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .local {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    width: 100px;
    height: 100px;
    right: 0;
    z-index: 1;
    object-fit: cover;
  }
}
</style>
