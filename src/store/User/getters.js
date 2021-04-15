export default {
  checkAuth (state) {
    return state.isAuthenticated
  },
  getDroneIdAndName (state) {
    return {
      name: state.user.name,
      droneId: state.user.droneId
    }
  },
  getDroneId (state) {
    return state.user.droneId
  }
}
