import { io } from 'socket.io-client'

export const startConnections = () => {
  const domain = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3030' : 'https://drone-cloud-295410.df.r.appspot.com'
  const socket = io(domain)
  socket.on('disconnect', reason => console.warn(reason))
  return socket
}
