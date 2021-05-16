import { createRouter, createWebHistory } from 'vue-router'
import auth from '../api/auth'
import store from '../store'
import { useNotification } from '../utils'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Intro.vue')
  },
  {
    path: '/dronecontrolpanel',
    name: 'DroneControlPanel',
    component: () => import('../views/DroneControlPanel.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/flightrecord',
    name: 'FlightRecord'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async to => {
  const isAuth = store.getters['User/getIsAuth']

  // white list
  const whiteList = ['/', '/signin', '/signup']
  if (whiteList.includes(to.path)) {
    if (isAuth && to.path === '/signin') return '/dronecontrolpanel'
    return true
  }

  // get user info
  if (!isAuth) {
    try {
      const { data } = await auth.fetchUserInfo()
      await store.dispatch('User/setUserInfo', data)
    } catch ({ response }) {
      switch (response.data.errCode) {
        case 2002: {
          try {
            await auth.renewToken()
            const { data } = await auth.fetchUserInfo()
            await store.dispatch('User/setUserInfo', data)
          } catch ({ response }) {
            switch (response.data.errCode) {
              case 2002: {
                useNotification.error('Session timeout', 'Please sign in again!')
                return '/signin'
              }
              default: {
                useNotification.error('Error', response.data.msg)
                return false
              }
            }
          }
          break
        }
        case 3001: {
          useNotification.error('Duplicates users detected', 'Someone sign in at another place')
          router.push({ path: '/signin' })
          break
        }
        default: {
          useNotification.error('Error', response.data.msg)
          return false
        }
      }
    }
    return true
  }
})

export default router
