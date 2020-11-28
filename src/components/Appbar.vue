<template>
  <div>
    <v-app-bar
      app
      hide-on-scroll
      elevation="3"
    >
      <v-app-bar-nav-icon @click="toggleDrawer" />
      <v-toolbar-title>Drone Cloud Platform3.0</v-toolbar-title>
      <v-progress-linear
        :active="isLoading"
        indeterminate
        absolute
        bottom
        color="deep-purple accent-4"
      />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Drone Cloud Platform
          </v-list-item-title>
          <v-list-item-subtitle>
            version: 3.0
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="light-blue--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  name: 'Appbar',
  setup () {
    const drawer = ref(false)
    const group = ref(null)
    const isLoading = ref(true)
    setTimeout(() => { isLoading.value = false }, 3500)
    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }
    return {
      drawer,
      group,
      isLoading,
      toggleDrawer
    }
  }
}
</script>
