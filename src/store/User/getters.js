export default {
  getIsAuth (state) {
    return state.isAuthenticated
  },
  getUserInfo (state) {
    return {
      ...state.user
    }
  }
}
