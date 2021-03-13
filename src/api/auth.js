import { customAxios, useNotify } from '../utils'
import store from '../store'
import router from '../router'

export default {
  /**
   * Sign in
   * @param {string} email User's email
   * @param {string} password User's password
   */
  async signIn (email, password) {
    const data = await customAxios.post('/auth/signin', { email, password })
    useNotify.success('Welcome!', data.msg)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    store.dispatch('User/signIn', {
      user: data.user
    })
    router.push({ path: '/dronecontrolpanel' })
  },

  signOut () {
    useNotify.success('Goodbye~', 'See you next time!')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    store.dispatch('User/signOut')
  },

  async fetchUserInfo () {
    return await customAxios.get('/auth/currentuser')
  },

  async refreshAccessToken (refreshToken) {
    const { accessToken } = await customAxios.post('/auth/refreshtoken', { refreshToken })
    localStorage.setItem('accessToken', accessToken)
  }
}
