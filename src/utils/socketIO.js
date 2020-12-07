import { io } from 'socket.io-client'

const domain = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3030' : 'https://drone-cloud-295410.df.r.appspot.com'
export const socket = io(domain)

export const subscribeDroneMsg = () => socket.on('drone_status', data => ({ ...data }))

export const unSubscribeDroneMsg = () => socket.on('disconnect', () => {
  console.log(socket.id)
})
