export default {
  getLogs (state) {
    return state.logs
  },

  getDroneInfo (state) {
    return state.info
  },

  getDronePropsStatus (state) {
    return state.info.isArm
  },

  getFlightAltitude (state) {
    return state.info.relativeAltitude
  },

  getCurrentYaw (state) {
    return state.info.heading
  },

  getCurrentFlightMode (state) {
    return state.info.flightMode
  },

  getCurrentGps (state) {
    const coords = {
      lng: state.info.longitude,
      lat: state.info.latitude
    }
    return coords
  },

  getFlightSpeed (state) {
    return state.parameters.speed
  },

  getTmpCoords (state) {
    return state.parameters.tmpCoords
  },

  getCurrentAltitude (state) {
    return state.parameters.altitude
  },

  getTargetGps (state) {
    const coords = {
      lng: state.parameters.targetLongitude,
      lat: state.parameters.targetLatitude
    }
    return coords
  }

}
