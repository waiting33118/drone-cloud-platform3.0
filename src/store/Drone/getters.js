export default {
  getLogs (state) {
    return state.logs
  },

  getTmpCoords (state) {
    return state.defaultParams.tmpCoords
  },

  getDroneInfo (state) {
    return state.info
  }
}
