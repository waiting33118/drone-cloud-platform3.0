import { socketInit } from './socket'
import { logFormat, messageParse } from './logFormatter'
import { fetchLocation } from './fetchLocation'
import { alert, gotoMissionConfirm } from './sweetAlert'
import { instance } from './axios'

export const useSocket = socketInit
export const uselogFormatter = logFormat
export const useMessageParse = messageParse
export const getUserLocation = fetchLocation
export const useGotoMissionConfirm = gotoMissionConfirm
export const useAlert = alert
export const customAxios = instance
