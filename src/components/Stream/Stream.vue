<template>
  <div class="video__wrapper">
    <video
      ref="remoteVideoEl"
      poster="../../assets/live-stream.png"
      autoplay
    ></video>
    <div class="control__wrapper">
      <a-tooltip placement="right" color="blue" title="Establish WEBRTC">
        <a-button
          class="button"
          size="small"
          shape="circle"
          type="primary"
          @click="startPeerNegotiation"
        >
          <ApiOutlined />
        </a-button>
      </a-tooltip>
      <a-tooltip placement="right" color="blue" title="Start Recording">
        <a-button class="button" size="small" shape="circle" type="primary">
          <CameraOutlined />
        </a-button>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import socket from '../../lib/websocket'
import {
  createPeerConnection,
  createAnswerAndSetLocalSDP,
  createOfferAndSetLocalSDP,
  getLocalStream
} from '../../lib/webRTC'
import { ApiOutlined, CameraOutlined } from '@ant-design/icons-vue'
import { onBeforeUnmount, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
export default {
  name: 'Stream',
  components: {
    ApiOutlined,
    CameraOutlined
  },
  setup() {
    const remoteVideoEl = ref(null)
    let pc
    let localStream
    const store = useStore()
    const setLogs = (log) => store.dispatch('setLogs', log)
    const onIceCandidate = (event) => {
      if (event.candidate) {
        socket.emit('send-webrtc', {
          type: 'candidate',
          payload: event.candidate
        })
        setLogs('Send candidate')
      }
    }
    const onTrack = (event) => {
      setLogs('Received track')
      remoteVideoEl.value.srcObject = new MediaStream()
      remoteVideoEl.value.srcObject = event.streams[0]
    }
    const onIceConnectionStateChange = (event) => {
      const status = event.target.iceConnectionState
      setLogs(`ICE connection Change: ${status}`)
      if (status === 'disconnected') {
        remoteVideoEl.value.srcObject = new MediaStream()
      }
    }

    const initPeerConnection = () => {
      pc = createPeerConnection()
      setLogs('Create peer connection')
      pc.onicecandidate = onIceCandidate
      pc.ontrack = onTrack
      pc.oniceconnectionstatechange = onIceConnectionStateChange
      if (localStream) {
        localStream.getTracks().forEach((track) => pc.addTrack(track))
        setLogs('Add local tracks to peer connection')
      }
    }

    const startPeerNegotiation = async () => {
      initPeerConnection()
      const offer = await createOfferAndSetLocalSDP(pc)
      setLogs('Create offer & set offer becomes local SDP')
      socket.emit('send-webrtc', { type: 'offer', payload: offer })
      setLogs('Send offer')
    }

    getLocalStream()
      .then((mediaStream) => {
        localStream = mediaStream
      })
      .catch((error) => {
        message.error(
          `Cannot add local stream to peer, cause of ${error.message}`
        )
      })
      .finally(() => {
        socket.on('webrtc-topic', async (data) => {
          if (data.type === 'offer') {
            setLogs('Received offer')
            initPeerConnection()
            await pc.setRemoteDescription(data.payload)
            setLogs('Set offer becomes remote SDP')
            const answer = await createAnswerAndSetLocalSDP(pc)
            setLogs('Create answer & set answer becomes local SDP')
            socket.emit('send-webrtc', { type: 'answer', payload: answer })
            setLogs('Send answer')
          }

          if (data.type === 'answer') {
            setLogs('Received answer')
            await pc.setRemoteDescription(data.payload)
            setLogs('Set answer becomes remote SDP')
          }

          if (data.type === 'candidate') {
            await pc.addIceCandidate(data.payload)
            setLogs('Add received candidate')
          }
        })
      })

    onBeforeUnmount(() => {
      socket.off('webrtc-topic')
      setTimeout(() => {
        if (localStream) {
          localStream.getTracks().forEach((track) => track.stop())
        }
      }, 1000)
    })

    return {
      remoteVideoEl,
      startPeerNegotiation
    }
  }
}
</script>

<style lang="scss" scoped>
.video__wrapper {
  height: 100%;
  position: relative;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }

  .control__wrapper {
    position: absolute;
    top: -25px;
    left: 5px;
    z-index: 110;
    display: flex;
    flex-direction: row;
    @media (min-width: 800px) {
      top: 5px;
      flex-direction: column;
    }

    .button {
      margin-right: 2px;
      @media (min-width: 800px) {
        margin-right: 0;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
