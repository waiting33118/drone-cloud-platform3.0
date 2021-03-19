import { useMessage } from '.'

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
 * @param {string | null} cmd For COMMAND ACK only, MISSION ACK will set to `null`
 * @param {string} message
 */
export const messageParse = (cmd, message) => {
  if (message.includes('FAILED') || message.includes('ERROR')) {
    cmd ? useMessage.error(cmd.slice(cmd.indexOf('=') + 1)) : useMessage.error(message.slice(message.indexOf('=') + 1))
    return
  }
  cmd ? useMessage.success(cmd.slice(cmd.indexOf('=') + 1)) : useMessage.success(message.slice(message.indexOf('=') + 1))
}
