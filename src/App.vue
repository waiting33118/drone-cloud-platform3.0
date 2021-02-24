<template>
  <el-header
    class="header"
  >
    <Navbar />
  </el-header>
  <router-view />
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'App',
  components: { Navbar }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  font-family: 'Roboto',sans-serif;
}
#app{
  height: 100%;
  width: 100%;
}
</style>

<style lang="scss" scoped>
  .header {
    padding: 0;
  }
</style>
