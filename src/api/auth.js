import { customAxios, useNotification } from '../utils'

export default {
  /**
   * Sign up
   * @param {string} email
   * @param {string} password
   * @param {string} checkPassword
   * @param {string} name
   * @param {string} droneId
   */
  async signUp (email, password, checkPassword, name, droneId) {
    try {
      await customAxios.post('/auth/signup', { email, password, checkPassword, name, droneId })
      useNotification.success('Register successfully! Sign in to get start!')
      return true
    } catch ({ response }) {
      switch (response.data.errCode) {
        case 1000:
        case 1001:
        case 1002:
        case 1003:
          useNotification.error('Sign Up Error', response.data.reason)
          break
        default:
          useNotification.error('Error', response.data.msg || '')
          break
      }
      return false
    }
  },

  /**
   * Sign in
   * @param {string} email
   * @param {string} password
   */
  async signIn (email, password) {
    try {
      await customAxios.post('/auth/signin', { email, password })
      useNotification.success('Welcome back!')
      return true
    } catch ({ response }) {
      switch (response.data.errCode) {
        case 1100:
        case 1101:
        case 1102:
          useNotification.error('Sign In Error', response.data.reason)
          break
        default:
          useNotification.error('Error', response.data.msg || '')
          break
      }
      return false
    }
  },

  async signOut (userId) {
    try {
      await customAxios.post('/auth/signout', { userId })
      return true
    } catch ({ response }) {
      useNotification.error('Error', response.data.msg || '')
      return false
    }
  },

  async fetchUserInfo () {
    return await customAxios.get('/user')
  },

  async renewToken () {
    return await customAxios.post('/auth/renewToken')
  }
}
