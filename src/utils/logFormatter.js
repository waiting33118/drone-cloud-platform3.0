import { useAlert } from '.'

/**
 *  Combine timestamp & message
 * @param {string} message
 */
export const logFormat = (message) => {
  const timestamp = new Date().toLocaleString()
  const log = `${timestamp}- ${message}`
  return log
}

/**
 * Parse message is Success or Failed
 * @param {string | null} cmd For ACK only
 * @param {string} message
 */
export const messageParse = (cmd, message) => {
  if (message.includes('FAILED') || message.includes('ERROR')) {
    if (cmd) { message = cmd }
    useAlert(`${message}`)
    return
  }
  if (cmd) { message = cmd }
  useAlert(`${message}`, 'success')
}
