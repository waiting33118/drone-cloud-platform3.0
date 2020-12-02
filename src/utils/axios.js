import axios from 'axios'

const RESTFUL_SERVER = {
  cloud: 'https://drone-cloud-295410.df.r.appspot.com/api/v1',
  local: 'http://localhost:3030/api/v1'
}

/**
 * custom axios config
 * ```
 * baseURL: 'https://drone-cloud-295410.df.r.appspot.com/api/v1' (cloud)
 *          'http://localhost:3030/api/v1' (localhost)
 * ```
 */
export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? RESTFUL_SERVER.local
    : RESTFUL_SERVER.cloud
})
