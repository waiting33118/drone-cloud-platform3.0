import { io } from 'socket.io-client'

const SOCKET_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? 'https://api.aiotlab-drone-cloud.ga'
    : 'http://localhost:3030'

const socket = io(SOCKET_DOMAIN)
export default socket
