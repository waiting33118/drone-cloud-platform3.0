import { notification } from 'ant-design-vue'
import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import auth from '../services/auth'
import user from '../services/user'
import store from '../store'

const refreshToken = () => {
  return setInterval(async () => await auth.refreshToken(), 4 * 60000)
}
let intervalTimer

const routes = [
  {
    path: '/',
    name: 'Introduction',
    component: () => import('../views/Introduction.vue')
  },
  {
    path: '/drone',
    name: 'Drone',
    component: () => import('../views/Drone.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: async () => {
      await auth.logout()
      clearInterval(intervalTimer)
      store.dispatch('setIsLogout')
      return '/'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const whiteListRoute = ['/signup']
const isAuth = computed(() => store.getters.getIsAuth)

router.beforeEach(async (to) => {
  if (whiteListRoute.includes(to.path)) {
    return true
  }

  if (to.path === '/login') {
    if (isAuth.value) return '/drone'
    if (!isAuth.value) {
      try {
        await user.getUserInfo()
        return '/drone'
      } catch (error) {
        return true
      }
    }
  }

  if (!isAuth.value) {
    if (to.path === '/') return true
    try {
      const { data } = await user.getUserInfo()
      store.dispatch('setIsAuth')
      store.dispatch('setUserInfo', data)
      intervalTimer = refreshToken()
      return true
    } catch (error) {
      notification.error({
        message: error.response.data.msg
      })
      return '/login'
    }
  }

  if (to.name === 'NotFound') {
    setTimeout(() => {
      router.push({ name: 'Introduction', replace: true })
    }, 5000)
  }

  return true
})

export default router
