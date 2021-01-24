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
}
