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
    const result = await customAxios.post('/auth/signin', { email, password })

    if (result.status === 'success') {
      useNotify.success('Welcome!', result.msg)
      localStorage.setItem('accessToken', result.accessToken)
      localStorage.setItem('refreshToken', result.refreshToken)
      store.dispatch('User/signIn', {
        user: result.user
      })
      router.push({ path: '/dronecontrolpanel' })
      return
    }
    useNotify.error('Sign in error', result.msg)
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
    try {
      const { accessToken } = await customAxios.post('/auth/refreshtoken', { refreshToken })
      localStorage.setItem('accessToken', accessToken)
      store.dispatch('User/fetchUserInfo')
    } catch (error) {
      router.push({ path: '/signin' })
    }
  }
}
