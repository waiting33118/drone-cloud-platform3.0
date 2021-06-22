export const geolocation = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      resolve([coords.longitude, coords.latitude])
    },
    (err) => {
      reject(err.message)
    },
    { enableHighAccuracy: true }
  )
})
