import { io } from 'socket.io-client'
import { useStore } from 'vuex'
import { useMessageParse } from '.'

export const socketInit = () => {
  const DOMAIN = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3030'
    : 'https://drone-cloud-platform-backend-6zwa3npg7q-de.a.run.app'

  const socket = io(DOMAIN)
  const store = useStore()

  socket.on('connect', () => store.dispatch('Drone/connect', socket.id))
  socket.on('disconnect', reason => store.dispatch('Drone/disconnect', reason))
  socket.on('message', ({ Drone: drone, Phone: phone }) => {
    store.dispatch('Drone/setDroneInfo', { ...drone, ...phone })
  })
  socket.on('ack', ({ cmd, cmd_result: result }) => {
    store.dispatch('Drone/setACK', { cmd, result })
    useMessageParse(cmd, result)
  })
  socket.on('mission', ({ mission_result: result }) => {
    store.dispatch('Drone/setMission', { result })
    useMessageParse(null, result)
  })
  socket.on('apm', data => {
    store.dispatch('Drone/setApm', data)
  })
}
