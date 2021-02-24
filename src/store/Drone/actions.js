import { uselogFormatter } from '../../utils'

export default {
  connect ({ commit }, socketId) {
    const message = `ID:${socketId} ENV:${process.env.NODE_ENV}`
    commit('saveLog', uselogFormatter(message))
  },

  disconnect ({ commit }, reason) {
    commit('saveLog', uselogFormatter(reason))
  },

  setACK ({ commit }, { cmd, result }) {
    const message = `[ACK] ${cmd} ${result}`
    commit('saveLog', uselogFormatter(message))
  },

  setApm ({ commit }, { text }) {
    const message = `[APM] ${text}`
    commit('saveLog', uselogFormatter(message))
  },

  setMission ({ commit }, { result }) {
    const message = `[Mission] ${result}`
    commit('saveLog', uselogFormatter(message))
  },

  setUserLocation ({ commit }, payload) {
    commit('setUserLocation', payload)
  },

  setTargetLocation ({ commit }, payload) {
    commit('setTargetLocation', payload)
  },

  setFlightAltitude ({ commit }, altitude) {
    commit('setFlightAltitude', altitude)
  },

  setFlightSpeed ({ commit }, speed) {
    commit('setFlightSpeed', speed)
  },

  setYaw ({ commit }, yaw) {
    commit('setYaw', yaw)
  },

  setGimbalY ({ commit }, pwm) {
    commit('setGimbalY', pwm)
  },

  setGimbalX ({ commit }, pwm) {
    commit('setGimbalX', pwm)
  },

  setDroneInfo ({ commit }, payload) {
    const {
      timestamp = '',
      attitude: {
        pitch = '',
        roll = '',
        yaw = ''
      },
      battery: {
        percentage = '',
        voltage = ''
      },
      device_id: deviceId = '',
      gps_status: {
        gps_count: gpsCount = '',
        hpop = ''
      },
      heartbeat: {
        flight_mode: flightMode = '',
        is_armed: isArm
      },
      location: {
        heading = '',
        lng: longitude = '',
        lat: latitude = '',
        relative_alt: relativeAltitude = ''
      },
      speed: {
        air_speed: airSpeed = ''
      }
    } = payload

    const checkedPayload = {
      timestamp,
      deviceId,
      longitude,
      latitude,
      heading,
      relativeAltitude,
      airSpeed,
      flightMode,
      isArm: !(isArm === 'null' || isArm === '0'),
      pitch,
      roll,
      yaw,
      voltage,
      percentage,
      gpsCount,
      hpop
    }

    commit('setDroneInfo', checkedPayload)

    commit('setTmpCoords', { longitude, latitude })
  }
}
