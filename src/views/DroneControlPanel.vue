<template>
  <div class="container-fluid px-0">
    <ControlPanel class="control-panel" />
    <Stream class="stream" />
    <Mapbox class="mapbox" />
  </div>
</template>

<script>
import { useSocket } from '../utils'
import Mapbox from '@/components/DroneControlPanel/Mapbox.vue'
import ControlPanel from '@/components/DroneControlPanel/ControlPanel.vue'
import Stream from '@/components/DroneControlPanel/Stream.vue'

export default {
  name: 'DroneControlPanel',
  components: {
    Mapbox,
    ControlPanel,
    Stream
  },
  setup () {
    useSocket()
    // const droneSource = reactive({ info: {}, apmInfo: [], targetGPS: {}, altitude: 3 })
    // const socket = startConnections()
    // socket.on('connect', () => {
    //   droneSource.apmInfo.unshift(`${new Date().toLocaleString()}-Socket ID:${socket.id} Env:${process.env.NODE_ENV}`)
    //   console.log(new Date().toLocaleString(), socket.id, process.env.NODE_ENV)
    // })
    // /**
    //  * Recieve mqtt subscribe data
    //  */
    // socket.on('message', (data) => {
    //   const { Drone: drone, Phone: phone } = data
    //   droneSource.info = { ...drone, ...phone }
    // })
    // socket.on('ack', data => {
    //   const { cmd, cmd_result: result } = data
    //   const cmdRegex = cmd.slice(cmd.indexOf('=') + 1)
    //   result.includes('FAILED')
    //     ? alert({ title: `${cmdRegex} Failed!` })
    //     : alert({ title: `${cmdRegex} Success!`, icon: 'success' })
    // })
    // socket.on('mission', data => {
    //   const { mission_result: mission } = data
    //   const messageFormat = mission.slice(mission.indexOf('=') + 1)
    //   messageFormat.includes('ERROR')
    //     ? alert({ title: `${messageFormat}` })
    //     : alert({ title: `${messageFormat}`, icon: 'success' })
    // })
    // socket.on('apm', data => {
    //   const { text } = data
    //   const textRegexIndex = text.indexOf('=') + 1
    //   const textRegex = `${new Date().toLocaleString()}-${text.slice(textRegexIndex)}`
    //   droneSource.apmInfo.unshift(textRegex)
    // })

    // /**
    //  * Receive user click position of coordinates
    //  * @param {object} coords Coordinates
    //  */
    // const handleCoordsEmit = coords => { droneSource.targetGPS = { ...coords } }

    // /**
    //  * Receive user change altitude event
    //  * @param {string} altitude Altitude
    //  */
    // const handleAltitudeEmit = altitude => { droneSource.altitude = Number(altitude) }

    // return {
    //   droneSource,
    //   handleCoordsEmit,
    //   handleAltitudeEmit
    // }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid{
  height: calc(100% - 58px);  // 58px = navbar height
  display: grid;
  grid-template-columns: repeat(7,minmax(auto,500px));
  grid-template-rows: repeat(2,minmax(250px,1fr));
    >.control-panel{
      grid-column: 1 / 2;
      grid-row: 1;
      border: 2px solid gainsboro;
      overflow: auto;
    }
    >.stream{
      width: 500px;
      grid-column: 1 / 2;
      grid-row: 2;
      border: 2px solid gainsboro;
    }
    >.mapbox{
      grid-column: 2 / 8;
      grid-row: 1 / span 2;
      border: 2px solid gainsboro;
      position: relative;
    }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(6,minmax(auto,350px));
    >.control-panel{
      grid-column: 1 / 2;
      grid-row: 1;
      border: 2px solid gainsboro;
    }
    >.stream{
      width: 450px;
      grid-column: 1 / 2;
      grid-row: 2;
      border: 2px solid gainsboro;
    }
    >.mapbox{
      grid-column: 2 / 7;
      grid-row: 1 / span 2;
      border: 2px solid gainsboro;
      position: relative;
    }
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3,minmax(350px,1fr));
    >.control-panel{
      grid-column: 1 ;
      grid-row: 1;
      border: 2px solid gainsboro;
    }
    >.stream{
      width: 100%;
      grid-column: 1 ;
      grid-row: 2;
      border: 2px solid gainsboro;
    }
    >.mapbox{
      grid-column: 1;
      grid-row: 3;
      border: 2px solid gainsboro;
      position: relative;
    }
  }
}
</style>
