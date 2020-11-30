import axios from 'axios'

/**
 * custom axios config
 * ```
 * baseURL: 'http://127.0.0.1:3030/api/v1'
 * ```
 */
export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:3030/api/v1'
})
