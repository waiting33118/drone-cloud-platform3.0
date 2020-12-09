import { axiosInstance } from './../utils/axios'
import { Toast } from './../utils/sendAlert'

export default {
  /**
   * Drone security
   * @method arm
   */
  async arm () {
    try {
      const { data } = await axiosInstance.post('/arm')
      if (data.status === 'success')Toast.fire({ icon: 'success', title: 'ARM!' })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Drone security
   * @method disArm
   */
  async disArm () {
    try {
      const { data } = await axiosInstance.post('/disarm')
      if (data.status === 'success')Toast.fire({ icon: 'warning', title: 'DISARM!' })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Drone takeoff
   * @param {number} altitude Set drone's altitude
   */
  async takeOff (altitude) {
    try {
      const { data } = await axiosInstance.post('/takeoff', { altitude })
      if (data.status === 'success')Toast.fire({ icon: 'success', title: 'Drone takeoff!' })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Drone landing
   * @method land
   */
  async land () {
    try {
      const { data } = await axiosInstance.post('/land')
      if (data.status === 'success')Toast.fire({ icon: 'warning', title: 'Drone is landing...' })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Let the drone go to the specific coordinate
   * @param {number} lng Set drone's longitude
   * @param {number} lat Set drone's latitude
   * @param {number} altitude Set drone's altitude
   */
  async goTo (lng, lat, altitude) {
    try {
      const { data } = await axiosInstance.post('/goto', { lng, lat, altitude })
      if (data.status === 'success')Toast.fire({ icon: 'success', title: `[GOTO] GPS (${lng}, ${lat}) Altitude: ${altitude}` })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Changing drone's flight altitude
   * @param {number} altitude Set drone's altitude
   */
  async changeFlightHeight (altitude) {
    try {
      const { data } = await axiosInstance.post('/cfa', { altitude })
      if (data.status === 'success')Toast.fire({ icon: 'info', title: `Change drone's flight altitude to ${altitude} meter` })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Changing drone's air speed
   * @param {number} speed Set drone's air speed
   */
  async changeAirSpeed (speed) {
    try {
      const { data } = await axiosInstance.post('/cas', { speed })
      if (data.status === 'success')Toast.fire({ icon: 'info', title: `Change drone's air speed to ${speed} m/s` })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
 * Change drone's flight mode
 * @param {string} mode Set drone's flight mode
 */
  async changeFlightMode (mode) {
    try {
      const { data } = await axiosInstance.post('/cfm', { mode })
      if (data.status === 'success')Toast.fire({ icon: 'success', title: `Change drone's flight mode to ${mode}` })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Send command to control servo
   * @param {string} command servo command
   */
  async sendServoControl (command) {
    try {
      const { data } = await axiosInstance.post('/ssc', { command })
      if (data.status === 'success')Toast.fire({ icon: 'info', title: command })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  }
}
