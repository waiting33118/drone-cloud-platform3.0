export default {
  signIn (state, { user }) {
    state.isAuthenticated = true
    state.user = { ...user }
  },
  signOut (state) {
    state.isAuthenticated = false
    state.user = {
      id: '',
      name: '',
      email: '',
      droneId: ''
    }
  },
  setUserInfo (state, { user }) {
    state.isAuthenticated = true
    state.user = { ...user }
  }
}
