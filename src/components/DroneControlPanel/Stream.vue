<template>
  <video
    id="videoEl"
    ref="videoEl"
    autoplay
    muted
    poster="@/assets/live-streaming.png"
  />
</template>

<script>
import flvjs from 'flv.js'
import { onMounted, onUnmounted, ref } from '@vue/runtime-core'
export default {
  name: 'Stream',
  setup () {
    const videoEl = ref(null)
    onMounted(() => {
      if (flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          hasAudio: false,
          hasVideo: true,
          url: 'https://aiotlab-drone-cloud.ga:8443/live/test.flv',
          cors: true,
          withCredentials: false

        }, {
          enableStashBuffer: false,
          isLive: true,
          autoCleanupSourceBuffer: true,
          stashInitialSize: 128
        })
        flvPlayer.attachMediaElement(videoEl.value)
        flvPlayer.load()
        const playPromise = flvPlayer.play()

        onUnmounted(() => {
          playPromise.then(_ => {
            flvPlayer.pause()
            flvPlayer.destroy()
          }).catch(error => console.log(error))
        })
      }
    })

    return {
      videoEl
    }
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
