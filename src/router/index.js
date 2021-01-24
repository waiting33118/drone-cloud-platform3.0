import { createRouter, createWebHashHistory } from 'vue-router'
import DroneControlPanel from '../views/DroneControlPanel.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
