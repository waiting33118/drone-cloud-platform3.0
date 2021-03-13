<template>
  <div class="container">
    <router-link
      class="title-link"
      to="/"
    >
      <h1 class="hidden-xs-only">
        Drone Cloud Platform
      </h1>
    </router-link>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      active-text-color="#409EF0"
      :router="true"
    >
      <el-menu-item
        v-if="isSignIn"
        index="dronecontrolpanel"
      >
        Control Panel
      </el-menu-item>
      <el-menu-item
        v-if="isSignIn"
        index="flightrecord"
      >
        Flight Record
      </el-menu-item>
      <el-submenu
        v-if="isSignIn"
        index="/"
      >
        <template #title>
          Settings
        </template>
        <el-menu-item index="account">
          Account
        </el-menu-item>
        <el-menu-item
          index="/"
          @click="handleSignOut"
        >
          Sign Out
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        v-if="!isSignIn"
        index="signin"
      >
        Sign In
      </el-menu-item>
      <el-menu-item
        v-if="!isSignIn"
        index="signup"
      >
        Sign Up
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { computed, watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { auth } from '../api'
export default {
  name: 'Navbar',
  setup () {
    const store = useStore()
    const route = useRoute()
    const activeIndex = ref('')
    const routerList = ['dronecontrolpanel', 'flightrecord', 'account', 'signin', 'signup']
    const isSignIn = computed(() => store.getters['User/checkAuth'])

    // handle navbar active link
    watch(() => route.name, newRouterName => {
      const currentLink = newRouterName.toLowerCase()
      if (routerList.includes(currentLink)) {
        activeIndex.value = currentLink
        return
      }
      activeIndex.value = ''
    })

    const handleSignOut = () => auth.signOut()

    return {
      activeIndex,
      isSignIn,
      handleSignOut
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: solid 1px #dcdfe6;
  > .title-link {
    text-decoration: none;
    color: black;
  }
  .el-menu-item,
  .el-submenu {
    font-size: 0.5rem;
    padding: 0 10px;
  }
  @media screen and (min-width:768px) {
    justify-content: space-around;
    >.title-link {
      font-size: 0.6rem;
    }
    .el-menu-item,
    .el-submenu {
      font-size: 1rem;
      padding: 0 20px;
    }
  }
  @media screen and (min-width:992px) {
    >.title-link {
      font-size: 1rem;
    }
  }
}
</style>
