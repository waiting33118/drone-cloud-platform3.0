import { computed } from '@vue/runtime-core'
import { io } from 'socket.io-client'
import { useStore } from 'vuex'
import { useMessageParse } from '.'

const DOMAIN = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:3030'
  : 'https://daas-backend-6zwa3npg7q-de.a.run.app'
export const socketInit = () => {
  const droneIdAndName = computed(() => store.getters['User/getDroneIdAndName'])
  const socket = io(DOMAIN)
  const store = useStore()

  socket.on('connect', () => {
    if (socket.connected) {
      store.dispatch('Drone/connect', socket.id)
    }
  })

  socket.on('disconnect', reason => store.dispatch('Drone/disconnect', reason))

  socket.emit('mqttSubscribe', droneIdAndName.value)

  // drone information
  socket.on(`${droneIdAndName.value.droneId}/message`, ({ Drone: drone, Phone: phone }) => {
    store.dispatch('Drone/setDroneInfo', { ...drone, ...phone })
  })
  // drone command ack
  socket.on(`${droneIdAndName.value.droneId}/cmd_ack`, ({ cmd, cmd_result: result }) => {
    store.dispatch('Drone/setACK', { cmd, result })
    useMessageParse(cmd, result)
  })
  // drone mission ack
  socket.on(`${droneIdAndName.value.droneId}/mission_ack`, ({ mission_result: result }) => {
    store.dispatch('Drone/setMission', { result })
    useMessageParse(null, result)
  })
  // drone debug text
  socket.on(`${droneIdAndName.value.droneId}/apm_text`, data => {
    store.dispatch('Drone/setApm', data)
  })

  return {
    socket,
    droneId: droneIdAndName.value.droneId
  }
}
