import { createStore } from 'vuex'
import drone from './drone'

export default createStore({
  state: {
    logs: [],
    isAuthenticated: false,
    rabbitmqIsInit: false,
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
    clearLogs({ commit }) {
      commit('clearLogs')
    },
    setUserInfo({ commit }, payload) {
      commit('setUserInfo', payload)
    },
    setIsAuth({ commit }, payload) {
      commit('setIsAuth', payload)
    },
    setRabbitmqIsInit({ commit }, payload) {
      commit('setRabbitmqIsInit', payload)
    }
  },
  mutations: {
    setLogs(state, payload) {
      state.logs.unshift(payload)
    },
    clearLogs(state) {
      state.logs = []
    },
    setUserInfo(state, payload) {
      state.user = payload
    },
    setIsAuth(state, payload) {
      state.isAuthenticated = payload
    },
    setRabbitmqIsInit(state, payload) {
      state.rabbitmqIsInit = payload
    }
  },
  getters: {
    getLogs(state) {
      return state.logs
    },
    getUserInfo(state) {
      return state.user
    },
    getUsername(state) {
      return state.user.email.substr(0, state.user.email.indexOf('@'))
    },
    getIsAuth(state) {
      return state.isAuthenticated
    },
    getRabbitmqIsInit(state) {
      return state.rabbitmqIsInit
    }
  },
  modules: {
    drone
  }
})
