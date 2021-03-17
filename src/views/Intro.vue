<template>
  <div
    v-loading="fullscreenLoading"
    element-loading-background="rgba(255, 255, 255)"
    class="intro"
    alt="intro-image"
  >
    <div class="title">
      Drone as a Service
    </div>
    <router-link to="/dronecontrolpanel">
      <el-button
        type="primary"
        class="button"
        round
      >
        <span class="button__text">
          Get Start
        </span>
      </el-button>
    </router-link>
  </div>
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
export default {
  name: 'Intro',
  setup () {
    const fullscreenLoading = ref(true)
    onMounted(() => {
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 1000)
    })
    return {
      fullscreenLoading
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  height: calc(100vh - 61px);
  width: 100%;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../public/intro.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter:blur(2px);
  }
  >.title{
    text-align: center;
    color: white;
    min-width: 100%;
    font-size: 35px;
    font-weight:800;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    @media screen and (min-width: 425px) {
      font-size: 45px;
      font-weight:1000;
    }
    @media screen and (min-width: 768px) {
      font-size: 85px;
      font-weight:1200;
    }
    @media screen and (min-width: 1024px) {
      font-size: 115px;
      font-weight:1400;
    }
  }
  .button{
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    .button__text {
      font-size: 1rem;
      font-weight: 500;
      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
        font-weight: 700;
      }
      @media screen and (min-width:992px) {
        font-size: 2rem;
        font-weight: 900;
      }
    }
  }
}
</style>
