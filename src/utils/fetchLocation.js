/**
 * Get user's Gps coordinate
 */
export const fetchLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { resolve(coords) },
      reject,
      { enableHighAccuracy: true })
  })
}
