import { io } from 'socket.io-client'
import { useStore } from 'vuex'

export const socketInit = () => {
  const DOMAIN = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3030'
    : 'https://drone-cloud-295410.df.r.appspot.com'

  const socket = io(DOMAIN)
  const store = useStore()

  socket.on('connect', () => store.dispatch('Drone/connect', socket.id))
  socket.on('disconnect', reason => store.dispatch('Drone/disconnect', reason))
  socket.on('message', ({ Drone: drone, Phone: phone }) => {
    store.dispatch('Drone/setDroneInfo', { ...drone, ...phone })
  })
  socket.on('ack', data => {
    store.dispatch('Drone/setACK', data)
  })
  socket.on('mission', data => {
    store.dispatch('Drone/setMission', data)
  })
  socket.on('apm', data => {
    store.dispatch('Drone/setApm', data)
  })
}
