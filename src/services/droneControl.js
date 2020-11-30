import { axiosInstance } from './../utils/axios'
import { Toast } from './../utils/sendAlert'

export default {
  /**
   * Drone takeoff
   * @param number flight altitude
   */
  async takeOff  (altitude) {
    try {
      const { data } = await axiosInstance.post('/takeoff', { altitude })
      if (data.status === 'success')Toast.fire({ icon: 'success', title: 'Drone takeoff!' })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Drone landing
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
   * Set drone's destination
   * @param number longitude
   * @param number latitude
   * @param number altitude
   */
  async goTo (lng, lat, altitude) {
    try {
      const { data } = await axiosInstance.post('/goto', { lng, lat, altitude })
      if (data.status === 'success')Toast.fire({ icon: 'success', title: `[GOTO] GPS (${lng}, ${lat})` })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  /**
   * Change drone's flight altitude
   * @param Number flight altitude
   */
  async changeFlightHeight (altitude) {
    try {
      const { data } = await axiosInstance.post('/cfa', { altitude })
      if (data.status === 'success')Toast.fire({ icon: 'info', title: `Change drone's flight altitude to ${altitude} meter` })
    } catch (error) {
      Toast.fire({ icon: 'error', title: error.message })
    }
  },

  returnToLand () {

  }
}
