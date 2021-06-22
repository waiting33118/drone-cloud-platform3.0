import axios from 'axios'
import { notification } from 'ant-design-vue'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://aiotlab-drone-cloud.ga:3031/api/v1'
    : 'http://localhost:3030/api/v1'
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 500) {
      notification.error({
        message: 'Error',
        description: error.response.data.msg,
        duration: 0
      })
      return
    }

    return Promise.reject(error)
  }
)

export default axios
