import Swal from 'sweetalert2'

/**
 * Swal Mixin - config
 * ```
 * toast: true,
 * position: 'top',
 * showConfirmButton: false,
 * timer: 3000,
 * timerProgressBar: true
 * ```
 */
export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
