import axios from 'axios'

const SERVER = {
  LOCAL: 'http://localhost:3030/api/v1',
  CLOUD: 'https://drone-cloud-platform-backend-6zwa3npg7q-de.a.run.app/api/v1'
}

/**
 * custom axios config
 */
export const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? SERVER.LOCAL
    : SERVER.CLOUD
})
