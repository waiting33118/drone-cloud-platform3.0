import { auth } from '../../api'

export default {
  signIn ({ commit }, { user }) {
    commit('signIn', { user })
  },
  signOut ({ commit }) {
    commit('signOut')
  },
  async fetchUserInfo ({ commit }) {
    const user = await auth.fetchUserInfo()
    commit('setUserInfo', { user })
  }
}
