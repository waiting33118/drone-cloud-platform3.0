import Swal from 'sweetalert2'

/**
 * Show error message
 * @param {string} title Alert title
 * @param {string} icon `'error','info','success'`
 */
export const alert = (title, icon = 'error') => {
  Swal.fire({
    title,
    icon,
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
}

/**
 * Comfirm the goto mission
 * @param {number} lng Longitude
 * @param {number} lat Latitude
 */
export const gotoMissionConfirm = (lng, lat) => {
  return Swal.fire({
    title: 'Press "OK" to start Mission!',
    text: `Go to GPS: ${lng}, ${lat}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
  })
}
