<template>
  <div
    class="intro"
    alt="intro-image"
  >
    <div class="title">
      Drone as a Service
    </div>
    <router-link to="/dronecontrolpanel">
      <el-button
        type="primary"
        class="get-start"
        round
      >
        Get Start
      </el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Intro'
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
  .get-start{
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    @media screen and (min-width: 1024px) {
      width: 250px;
      height: 60px;
    }
  }
}
</style>
