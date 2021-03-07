import { createRouter, createWebHashHistory } from 'vue-router'
import DroneControlPanel from '@/views/DroneControlPanel.vue'
import SignIn from '@/views/SignIn.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: 'DroneControlPanel'
    }
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
