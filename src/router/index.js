import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import DroneControlPanel from '@/views/DroneControlPanel.vue'
import SignIn from '@/views/SignIn.vue'
import Intro from '@/views/Intro.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Intro
  },
  {
    path: '/dronecontrolpanel',
    name: 'DroneControlPanel',
    component: DroneControlPanel
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    redirect: { path: '/signin' }
  },
  {
    path: '/flightrecord',
    name: 'FlightRecord'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  // get authenticate status
  const isAuth = store.getters['User/checkAuth']
  const accessToken = localStorage.getItem('accessToken')

  /*
   * situation
   * User login and go to signin page => redirect to drone control panel
   */
  if (isAuth && (to.path === '/signin' || to.path === '/signup')) {
    return '/dronecontrolpanel'
  }

  /*
   * situation
   * user logged in , but refresh the webpage
   * (token in localstorage, user info is empty in vuex)
   * refetch user data and resave into vuex
   */
  if (!isAuth && accessToken) {
    await store.dispatch('User/fetchUserInfo')
    return to.path
  }

  /*
   * Router whitelist
   */
  const whiteList = ['/', '/signin']
  if (whiteList.includes(to.path)) {
    return
  }
  /*
   * situation
   * user not login yet (no token in localstorage(null), user info is empty in vuex )
   */
  if (!isAuth) {
    return '/signin'
  }
})

export default router
