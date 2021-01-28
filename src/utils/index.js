import { socketInit } from './socket'
import { logFormat } from './logFormatter'
import { fetchLocation } from './fetchLocation'
import { gotoMissionConfirm } from './sweetAlert'
import { instance } from './axios'

export const useSocket = socketInit
export const uselogFormatter = logFormat
export const getUserLocation = fetchLocation
export const useGotoMissionConfirm = gotoMissionConfirm
export const customAxios = instance
