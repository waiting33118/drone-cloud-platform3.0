export default {
  setUserInfo (state, user) {
    state.isAuthenticated = true
    state.user = { ...user }
  },
  signOut (state) {
    state.isAuthenticated = false
    state.user = {}
  }
}
