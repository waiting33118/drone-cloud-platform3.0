import { io } from 'socket.io-client'

const domain = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3030' : 'https://drone-cloud-295410.df.r.appspot.com'
export const socket = io(domain)

/**
     * check socket connection
     */
export const onConnection = () => {
  socket.on('connect', () => console.log(new Date().toLocaleString(), socket.id))
}

export const offMsg = () => socket.removeAllListeners('drone_status')
