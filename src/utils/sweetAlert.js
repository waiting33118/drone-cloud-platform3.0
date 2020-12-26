import Swal from 'sweetalert2'

/**
 * Show error message
 * @param {string} title alert message
 */
export const alert = ({ title, icon = 'error' }) => {
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
