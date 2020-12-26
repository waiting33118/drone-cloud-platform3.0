import axios from 'axios'

const server = {
  local: 'http://localhost:3030/api/v1',
  cloud: 'https://drone-cloud-295410.df.r.appspot.com/api/v1'
}

/**
 * custom axios instance
 */
export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? server.local
    : server.cloud
})
