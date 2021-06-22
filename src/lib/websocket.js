import { io } from 'socket.io-client'

const SOCKET_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://aiotlab-drone-cloud.ga:3031'
    : 'http://localhost:3030'

export default io(SOCKET_DOMAIN)
