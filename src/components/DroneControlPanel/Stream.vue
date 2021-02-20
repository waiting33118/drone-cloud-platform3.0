<template>
  <video
    id="videoEl"
    autoplay
    muted
    poster="./../../../public/live-streaming.png"
  />
</template>

<script>
import flvjs from 'flv.js'
import { onMounted } from 'vue'
export default {
  name: 'Stream',
  setup () {
    onMounted(() => {
      if (flvjs.isSupported()) {
        const videoEl = document.querySelector('#videoEl')
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          hasAudio: false,
          hasVideo: true,
          url: 'https://35.201.182.150:8443/live/test.flv'
        }, {
          enableStashBuffer: false,
          isLive: true,
          autoCleanupSourceBuffer: true,
          stashInitialSize: 128
        })
        flvPlayer.attachMediaElement(videoEl)
        flvPlayer.load()
        flvPlayer.play()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style>
