import { io } from 'socket.io-client'

const DOMAIN = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:3030'
  : 'https://daas-backend-6zwa3npg7q-de.a.run.app'

export const socketInstance = io(DOMAIN)
