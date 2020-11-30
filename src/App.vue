<template>
  <v-app>
    <appbar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Appbar from './components/Appbar.vue'
export default {
  name: 'App',
  components: {
    Appbar
  }
}
</script>

<style lang="scss">
* {
  font-family: 'Roboto', sans-serif;
}
</style>
