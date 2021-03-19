import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'

export const notification = {
  /**
   * Trigger an error notification
   * @param {string} title
   * @param {string} message
   */
  error (title, message) {
    ElNotification({
      title,
      message,
      type: 'error',
      duration: 3500
    })
  },

  /**
   * Trigger an success notification
   * @param {string} title
   * @param {string} message
   */
  success (title, message) {
    ElNotification({
      title,
      message,
      type: 'success',
      duration: 3500
    })
  }
}

export const message = {
  /**
   * Trigger an error message
   * @param {string} message
   */
  error (message) {
    ElMessage({
      message,
      type: 'error',
      duration: 2000
    })
  },

  /**
   * Trigger an success message
   * @param {string} message
   */
  success (message) {
    ElMessage({
      message,
      type: 'success',
      duration: 2000
    })
  }
}

export const messageBox = async (title, message) => await ElMessageBox.confirm(message, title, {
  type: 'warning',
  showClose: false,
  cancelButtonText: 'Cancel',
  confirmButtonText: 'OK',
  center: true,
  roundButton: true
})
