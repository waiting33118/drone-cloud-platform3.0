export default {
  saveLog (state, payload) {
    state.logs.push(payload)
  },

  setUserLocation (state, { longitude, latitude }) {
    state.parameters.userLongitude = longitude
    state.parameters.userLatitude = latitude
  },

  setTargetLocation (state, { longitude, latitude }) {
    state.parameters.targetLongitude = longitude
    state.parameters.targetLatitude = latitude
  },

  setFlightAltitude (state, altitude) {
    state.parameters.altitude = altitude
  },

  setFlightSpeed (state, speed) {
    state.parameters.speed = speed
  },

  setDroneInfo (state, payload) {
    state.info = { ...payload }
  },

  setTmpCoords (state, { longitude, latitude }) {
    state.parameters.tmpCoords.push([longitude, latitude])
  },

  setGimbalY (state, pwm) {
    state.parameters.gimbalY = pwm
  },

  setGimbalX (state, pwm) {
    state.parameters.gimbalX = pwm
  }
}
