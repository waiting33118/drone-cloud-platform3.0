import axios from 'axios'
// import { useNotification } from '.'
// import { auth } from '../api'
// import store from '../store'
// import router from '../router'

const SERVER = {
  LOCAL: 'http://localhost:3030/api/v1',
  CLOUD: 'https://daas-backend-6zwa3npg7q-de.a.run.app/api/v1'
}

/**
 * custom axios config
 */
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? SERVER.LOCAL
    : SERVER.CLOUD,
  withCredentials: true
})

export default instance
