/**
 * Get user's Gps coordinate
 * @returns `Object`
 * @description If success, you will get an `Object` of coords,if fail,you will get `error`
 */
export const getUserLocation = () => {
  const options = { enableHighAccuracy: true }
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
