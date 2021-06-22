import { createStore } from 'vuex'
import drone from './drone'

export default createStore({
  state: {
    logs: [],
    isAuthenticated: false,
    user: {
      email: '',
      droneId: ''
    }
  },
  actions: {
    setLogs({ commit }, payload) {
      commit('setLogs', {
        id: Date.now(),
        timeStamp: new Date().toLocaleString(),
        payload
      })
    },
    setUserInfo({ commit }, payload) {
      commit('setUserInfo', payload)
    },
    setIsAuth({ commit }) {
      commit('setIsAuth')
    },
    setIsLogout({ commit }) {
      commit('setIsLogout')
    }
  },
  mutations: {
    setLogs(state, payload) {
      state.logs.unshift(payload)
    },
    setUserInfo(state, payload) {
      state.user = payload
    },
    setIsAuth(state) {
      state.isAuthenticated = true
    },
    setIsLogout(state) {
      state.isAuthenticated = false
    }
  },
  getters: {
    getLogs(state) {
      return state.logs
    },
    getUserInfo(state) {
      return state.user
    },
    getIsAuth(state) {
      return state.isAuthenticated
    }
  },
  modules: {
    drone
  }
})
