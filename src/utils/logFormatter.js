/**
 *  Combine timestamp & message
 * @param {string} message
 */
export const logFormat = (message) => {
  const timestamp = new Date().toLocaleString()
  const log = `${timestamp}- ${message}`
  return log
}
