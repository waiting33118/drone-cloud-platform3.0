import axios from 'axios'
import { useNotification } from '.'
import { auth } from '../api'
import router from '../router'

const SERVER = {
  LOCAL: 'http://localhost:3030/api/v1',
  CLOUD: 'https://drone-cloud-platform-backend-6zwa3npg7q-de.a.run.app/api/v1'
}

/**
 * custom axios config
 */
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? SERVER.LOCAL
    : SERVER.CLOUD
})

instance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`
  }
  return config
}, err => Promise.reject(err))

instance.interceptors.response.use(response => response.data
  , err => {
    const { errCode } = err.response.data
    console.log('interceptors response error', err.response)

    switch (errCode) {
      case 703:
      case 705:
      case 706:
      case 707:
      case 708:
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        router.push({ path: '/signin' })
        return

      case 704: {
        const refreshToken = localStorage.getItem('refreshToken')
        auth.refreshAccessToken(refreshToken)
        return
      }

      default:
        if (err.response.status === 500) {
          useNotification.error('Error', err.response.statusText)
          return
        }
        return err.response
    }
  })

export default instance

/**
|600| auth/signUp | Email,Name,Password are required!|
|601| auth/signUp | Password must longer than 8 characters!|
|602| auth/signUp | Email exsit!|
|700| auth/signIn | Email, Password are required! |
|701| auth/signIn | User not found! |
|702| auth/signIn | Wrong password! |
|703| middleware/checkAuth | Access token missing! |
|704| middleware/checkAuth | Access token Expired! |
|705| middleware/checkAuth | Access Token Error! |
|706| auth/refreshToken | Refresh token missing! |
|707| auth/refreshToken | Refresh Token Expired! |
|708| auth/refreshToken | Refresh Token Error! |
 */
