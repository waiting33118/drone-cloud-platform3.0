// import { alert } from '../utils/sweetAlert'
import { customAxios } from '../utils'

/**
 * Drone command - ARM
 */
export const arm = async () => {
  try {
    await customAxios.post('/arm')
  } catch (error) {
    console.error(error.response)
  }
}

/**
 * Drone command - DISARM
 */
export const disarm = async () => {
  try {
    await customAxios.post('/disarm')
  } catch (error) {
    console.error(error.response)
  }
}

/**
 * Drone command - TAKEOFF
 * @param {number} altitude Set drone's altitude
 */
export const takeoff = async (altitude) => {
  try {
    await customAxios.post('/takeoff', { altitude })
  } catch (error) {
    console.error(error.response)
  }
}

/**
 * Drone command - LAND
 */
export const land = async () => {
  try {
    await customAxios.post('land')
  } catch (error) {
    console.error(error.response)
  }
}

/**
 * Drone command - GOTO
 * @description Let the drone fly to destination
 * @param {number} lng Target longitude
 * @param {number} lat Target latitude
 * @param {number} altitude Drone's altitude
 */
export const goto = async (lng, lat, altitude) => {
  try {
    await customAxios.post('/goto', { lng, lat, altitude })
  } catch (error) {
    console.log(error.response)
  }
}

/**
 * Drone command - Change flying speed
 * @param {number} speed Drone's speed
 */
export const changeSpeed = async (speed) => {
  try {
    await customAxios.post('/changespeed', { speed })
  } catch (error) {
    console.log(error.response)
  }
}

/**
 * Drone command - Change Yaw(heading) (nose direction)
 * @param {number} angle Drone's heading
 */
export const changeYaw = async (angle) => {
  try {
    await customAxios.post('/changeyaw', { angle })
  } catch (error) {
    console.log(error.response)
  }
}

/**
 *  Drone command - Change flight mode
 * @param {string} mode Drone's flight mode
 */
export const changeFlightMode = async (mode) => {
  try {
    await customAxios.post('/changeflightmode', { mode })
  } catch (error) {
    console.log(error.response)
  }
}

// /**
//  *  Drone command - Change flight mode
//  * @param {string} mode Drone's flight mode
//  */
// async changeFlightMode (mode) {
//   try {
//     await useDroneAPI.post('/changeflightmode', { mode })
//   } catch (error) {
//     alert({ title: error.message })
//   }
// }
// /**
//  * Drone command - Let the drone fly to destination
//  * @param {number} lng Target longitude
//  * @param {number} lat Target latitude
//  * @param {number} altitude Drone's altitude
//  */
// async goto (lng, lat, altitude) {
//   try {
//     await useDroneAPI.post('/goto', { lng, lat, altitude })
//   } catch (error) {
//     alert({ title: error.message })
//   }
// }
// /**
//  * Drone command - Change flying speed
//  * @param {number} speed Drone's speed
//  */
// async changeSpeed (speed) {
//   try {
//     await useDroneAPI.post('/changespeed', { speed })
//   } catch (error) {
//     alert({ title: error.message })
//   }
// }
// /**
//  * Drone command - Change heading (nose direction)
//  * @param {number} angle Drone's heading
//  */
// async changeYaw (angle) {
//   try {
//     await useDroneAPI.post('/changeyaw', { angle })
//   } catch (error) {
//     alert({ title: error.message })
//   }
// }
// /**
//  *  Drone command - Command servo action
//  * @param {string} action Servo action(UP,DOWN,STOP)
//  */
// async servoControl (action) {
//   try {
//     await useDroneAPI.post('/servocontrol', { action })
//   } catch (error) {
//     alert({ title: error.message })
//   }
// }
// /**
//  *  Drone command - Change gimbal angle
//  * @param {string} cmd Gimbal action(x axis,y axis)
//  * @param {number} pwm Angle(pwm value)
//  */
// async gimbalControl (cmd, pwm) {
//   try {
//     await useDroneAPI.post('/gimbalcontrol', { cmd, pwm })
//   } catch (error) {
//     alert({ title: error.message })
//   }
// }
