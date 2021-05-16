<template>
  <div class="container">
    <!-- Trademark & Logo -->
    <router-link
      class="logo-wrapper"
      to="/"
    >
      <img
        width="40"
        height="40"
        src="@/assets/drone.svg"
        alt="logo"
        class="logo"
      >
      <span class="trademark hidden-xs-only">
        Drone Cloud Platform
      </span>
    </router-link>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      active-text-color="#409EF0"
      :router="true"
    >
      <el-menu-item
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
        <template
          #title
        >
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
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { auth } from '../api'
import { useNotification } from '../utils'
export default {
  name: 'Navbar',
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const activeIndex = ref('')
    const routerList = ['dronecontrolpanel', 'flightrecord', 'account', 'signin', 'signup']
    const isSignIn = computed(() => store.getters['User/getIsAuth'])
    const userInfo = computed(() => store.getters['User/getUserInfo'])

    // handle navbar active link
    watch(() => route.name, newRouterName => {
      const currentLink = newRouterName.toLowerCase()
      if (routerList.includes(currentLink)) {
        activeIndex.value = currentLink
        return
      }
      activeIndex.value = ''
    })

    const handleSignOut = async () => {
      const isSuccess = await auth.signOut(userInfo.value.id)
      if (isSuccess) {
        await store.dispatch('User/signOut')
        router.push({ path: '/signin' })
        useNotification.success('Goodbye~', 'See you next time!')
      }
    }

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
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 1px #dcdfe6;
  > .logo-wrapper {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    text-decoration: none;
    > .trademark {
      color: rgba(35, 133, 224, 0.8);
      filter: drop-shadow(0 0 8px rgba(133, 222, 238, 0.5));
      &:hover {
        color: rgba(35, 133, 224, 1);
      }
    }
  }
  .el-menu-item {
    font-size: 14px;
    padding: 0 10px;
  }
  .el-submenu {
    padding: 0;
  }
  @media screen and (min-width:768px) {
    .trademark {
      font-weight: 800;
      font-size: 1.5rem;
    }
  }
  @media screen and (min-width:992px) {
    .trademark {
      font-weight: 1000;
      font-size: 1.8rem;
    }
  }
}
</style>
