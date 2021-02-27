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
