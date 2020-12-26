import { alert } from '../utils/sweetAlert'
import { axiosInstance } from '../utils/axios'

export default {
  /**
   * Drone command - ARM
   */
  async arm () {
    try {
      await axiosInstance.post('/arm')
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   * Drone command - DISARM
   */
  async disarm () {
    try {
      await axiosInstance.post('/disarm')
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   * Drone command - TAKEOFF
   * @param {number} altitude Set drone's altitude
   */
  async takeOff (altitude) {
    try {
      await axiosInstance.post('/takeoff', { altitude })
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   * Drone command - LAND
   */
  async land () {
    try {
      await axiosInstance.post('land')
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   *  Drone command - Change flight mode
   * @param {string} mode Drone's flight mode
   */
  async changeFlightMode (mode) {
    try {
      await axiosInstance.post('/changeflightmode', { mode })
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   * Drone command - Let the drone fly to destination
   * @param {number} lng Target longitude
   * @param {number} lat Target latitude
   * @param {number} altitude Drone's altitude
   */
  async goto (lng, lat, altitude) {
    try {
      await axiosInstance.post('/goto', { lng, lat, altitude })
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   * Drone command - Change flying speed
   * @param {number} speed Drone's speed
   */
  async changeSpeed (speed) {
    try {
      await axiosInstance.post('/changespeed', { speed })
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   * Drone command - Change heading (nose direction)
   * @param {number} angle Drone's heading
   */
  async changeYaw (angle) {
    try {
      await axiosInstance.post('/changeyaw', { angle })
    } catch (error) {
      alert({ title: error.message })
    }
  },
  /**
   *
   * @param {string} action Servo action(UP,DOWN,STOP)
   */
  async servoControl (action) {
    try {
      await axiosInstance.post('/servocontrol', { action })
    } catch (error) {
      alert({ title: error.message })
    }
  }
}
