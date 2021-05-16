export default {
  setUserInfo ({ commit }, user) {
    commit('setUserInfo', user)
  },
  signOut ({ commit }) {
    commit('signOut')
  }

}
