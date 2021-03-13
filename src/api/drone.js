import { customAxios } from '../utils'

export default {
  /**
 * Drone command - ARM
 */
  async arm () {
    try {
      await customAxios.post('/drone/arm')
    } catch (error) {
      console.error(error)
    }
  },

  /**
 * Drone command - DISARM
 */
  async disarm () {
    try {
      await customAxios.post('/drone/disarm')
    } catch (error) {
      console.error(error)
    }
  },

  /**
 * Drone command - TAKEOFF
 * @param {number} altitude Set drone's altitude
 */
  async takeoff (altitude) {
    try {
      await customAxios.post('/drone/takeoff', { altitude })
    } catch (error) {
      console.error(error)
    }
  },

  /**
 * Drone command - LAND
 */
  async land () {
    try {
      await customAxios.post('/drone/land')
    } catch (error) {
      console.error(error)
    }
  },

  /**
 * Drone command - GOTO
 * @description Let the drone fly to destination
 * @param {number} lng Target longitude
 * @param {number} lat Target latitude
 * @param {number} altitude Drone's altitude
 */
  async goto (lng, lat, altitude) {
    try {
      await customAxios.post('/drone/goto', { lng, lat, altitude })
    } catch (error) {
      console.log(error)
    }
  },

  /**
 * Drone command - Change flying speed
 * @param {number} speed Drone's speed
 */
  async changeSpeed (speed) {
    try {
      await customAxios.post('/drone/changespeed', { speed })
    } catch (error) {
      console.log(error)
    }
  },

  /**
 * Drone command - Change Yaw(heading) (nose direction)
 * @param {number} angle Drone's heading
 */
  async changeYaw (angle) {
    try {
      await customAxios.post('/drone/changeyaw', { angle })
    } catch (error) {
      console.log(error)
    }
  },

  /**
 *  Drone command - Change flight mode
 * @param {string} mode Drone's flight mode
 */
  async changeFlightMode (mode) {
    try {
      await customAxios.post('/drone/changeflightmode', { mode })
    } catch (error) {
      console.log(error)
    }
  },

  /**
 *  Drone command - Command servo action
 * @param {string} action Servo action(UP,DOWN,STOP)
 */
  async servoControl (action) {
    try {
      await customAxios.post('/drone/servocontrol', { action })
    } catch (error) {
      console.log(error)
    }
  },

  /**
 *  Drone command - Change gimbal angle
 * @param {string} cmd Gimbal action(x axis,y axis)
 * @param {number} pwm Angle(pwm value)
 */
  async gimbalControl (cmd, pwm) {
    try {
      await customAxios.post('/drone/gimbalcontrol', { cmd, pwm })
    } catch (error) {
      console.log(error)
    }
  }
}
