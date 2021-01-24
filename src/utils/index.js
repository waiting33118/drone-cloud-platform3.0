import { socketInit } from './socket'
import { logFormat } from './logFormatter'
import { fetchLocation } from './fetchLocation'
import { gotoMissionConfirm } from './sweetAlert'

export const useSocket = socketInit
export const uselogFormatter = logFormat
export const getUserLocation = fetchLocation
export const useGotoMissionConfirm = gotoMissionConfirm
