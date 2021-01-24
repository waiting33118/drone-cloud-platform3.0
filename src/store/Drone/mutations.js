export default {
  saveLog (state, payload) {
    state.logs.unshift(payload)
  },
  setUserLocation (state, { longitude, latitude }) {
    state.defaultParams.userLongitude = longitude
    state.defaultParams.userLatitude = latitude
  },
  setTargetLocation (state, { longitude, latitude }) {
    state.defaultParams.targetLongitude = longitude
    state.defaultParams.targetLatitude = latitude
  }
}
