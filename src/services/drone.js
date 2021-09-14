import axios from '../lib/axios'

export default {
  /**
   * @param {Array} records
   */
  async saveFlightRecord(records) {
    return await axios.post('/drone/records', { records })
  }
}
