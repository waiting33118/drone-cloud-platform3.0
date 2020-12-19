<template>
  <!-- autoplay -->
  <!-- controls -->
  <video
    loop
    muted
  >
    <source
      src="https://i.imgur.com/zQJGZvg.mp4"
      type="video/mp4"
    >
  </video>
</template>

<script>
export default {
  name: 'Stream'
}
</script>

<style lang="scss" scoped>
  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style>
