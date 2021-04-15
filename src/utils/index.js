import { socketInstance } from './socket'
import { logFormat, messageParse } from './logFormatter'
import { fetchLocation } from './fetchLocation'
import { notification, message, messageBox } from './element-notice'
import { webrtc } from './webrtc'
import instance from './axios'

export const socket = socketInstance
export const uselogFormatter = logFormat
export const useMessageParse = messageParse
export const getUserLocation = fetchLocation
export const useNotification = notification
export const useMessage = message
export const useGotoMissionConfirm = messageBox
export const useWebrtc = webrtc
export const customAxios = instance
