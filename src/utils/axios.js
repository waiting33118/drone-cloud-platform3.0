import axios from 'axios'

const SERVER = {
  LOCAL: 'http://localhost:3030/api/v1',
  CLOUD: 'https://drone-cloud-295410.df.r.appspot.com/api/v1'
}

/**
 * custom axios config
 */
export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? SERVER.LOCAL
    : SERVER.CLOUD
})
