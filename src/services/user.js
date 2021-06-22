import axios from '../lib/axios'

export default {
  async getUserInfo() {
    return axios.get('/user/me')
  }
}
