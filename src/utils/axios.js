import axios from 'axios'

/**
 * custom axios config
 * ```
 * baseURL: 'https://drone-cloud-295410.df.r.appspot.com/api/v1/
 * ```
 */
export const axiosInstance = axios.create({
  baseURL: 'https://drone-cloud-295410.df.r.appspot.com/api/v1/'
})
