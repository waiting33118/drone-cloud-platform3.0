import { ElNotification } from 'element-plus'

export default {
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
      duration: 3700
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
      duration: 3700
    })
  }
}
