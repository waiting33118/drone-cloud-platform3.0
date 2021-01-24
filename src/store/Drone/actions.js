import { uselogFormatter } from '../../utils'

export default {
  connect ({ commit }, socketId) {
    const message = `ID:${socketId} ENV:${process.env.NODE_ENV}`
    commit('saveLog', uselogFormatter(message))
  },

  disconnect ({ commit }, reason) {
    commit('saveLog', uselogFormatter(reason))
  },

  setUserLocation ({ commit }, payload) {
    commit('setUserLocation', payload)
  },
  setTargetLocation ({ commit }, payload) {
    commit('setTargetLocation', payload)
  }
}
