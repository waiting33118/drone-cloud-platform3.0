import { customAxios, useMessage } from '../utils'

export default {
  /**
 * Drone command - ARM
 */
  async arm (droneId) {
    try {
      await customAxios.post('/drone/arm', { droneId })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 * Drone command - DISARM
 */
  async disarm (droneId) {
    try {
      await customAxios.post('/drone/disarm', { droneId })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 * Drone command - TAKEOFF
 * @param {string} droneId
 * @param {number} altitude Set drone's altitude
 */
  async takeoff (droneId, altitude) {
    try {
      await customAxios.post('/drone/takeoff', { droneId, altitude })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 * Drone command - LAND
 */
  async land (droneId) {
    try {
      await customAxios.post('/drone/land', { droneId })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 * Drone command - GOTO
 * @description Let the drone fly to destination
 * @param {string} droneId
 * @param {number} lng Target longitude
 * @param {number} lat Target latitude
 * @param {number} altitude Drone's altitude
 */
  async goto (droneId, lng, lat, altitude) {
    try {
      await customAxios.post('/drone/goto', { droneId, lng, lat, altitude })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 *  Drone command - Change flight mode
 * @param {string} droneId
 * @param {string} mode Drone's flight mode
 */
  async changeFlightMode (droneId, mode) {
    try {
      await customAxios.post('/drone/changeflightmode', { droneId, mode })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 * Drone command - Change flying speed
 * @param {string} droneId
 * @param {number} speed Drone's speed
 */
  async changeSpeed (droneId, speed) {
    try {
      await customAxios.post('/drone/changespeed', { droneId, speed })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 * Drone command - Change Yaw(heading) (nose direction)
 * @param {string} droneId
 * @param {number} angle Drone's heading
 */
  async changeYaw (droneId, angle) {
    try {
      await customAxios.post('/drone/changeyaw', { droneId, angle })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 *  Drone command - Command servo action
 * @param {string} droneId
 * @param {string} action Servo action(UP,DOWN,STOP)
 */
  async servoControl (droneId, action) {
    try {
      await customAxios.post('/drone/servocontrol', { droneId, action })
    } catch (error) {
      useMessage.error(error)
    }
  },

  /**
 *  Drone command - Change gimbal angle
 * @param {string} droneId
 * @param {string} action Gimbal action(x axis,y axis)
 * @param {number} pwm Angle(pwm value)
 */
  async gimbalControl (droneId, action, pwm) {
    try {
      await customAxios.post('/drone/gimbalcontrol', { droneId, action, pwm })
    } catch (error) {
      useMessage.error(error)
    }
  }
}
