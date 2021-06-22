<template>
  <section class="panel">
    <div class="control">
      <Control />
    </div>
    <div class="stream">
      <Stream />
    </div>
    <div class="map">
      <Mapbox />
    </div>
  </section>
</template>

<script>
import Stream from '../components/Stream/Stream.vue'
import Mapbox from '../components/Mapbox/Mapbox.vue'
import Control from '../components/Control/Control.vue'
import socket from '../lib/websocket'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { computed } from '@vue/runtime-core'
export default {
  name: 'Drone',
  components: { Stream, Mapbox, Control },
  setup() {
    const store = useStore()
    const user = computed(() => store.getters.getUserInfo)
    const formatCommand = (payload) => payload.split('=')[1]

    socket.on('connect', () => {
      store.dispatch('setLogs', `Websocket connected: ${socket.id}`)
      store.dispatch('setLogs', `Drone ID: ${user.value.droneId}`)
      socket.emit('create-rabbitmq-connection', user.value.droneId)
    })

    socket.on('disconnect', (reason) => {
      store.dispatch('setLogs', `Websocket disconnected: ${reason}`)
    })

    socket.on('rabbitmq-queue-isReady', () => {
      store.dispatch('setLogs', `Subscribe topic queue successfully`)
    })

    socket.on('drone-topic', (data) => {
      if (data.type === 'message') {
        const {
          drone_info: {
            timestamp: timeStamp,
            attitude: { yaw, roll, pitch },
            battery: { voltage, percentage },
            gps_status: { hpop, gps_count: gpsCount },
            heartbeat: { flight_mode: mode, is_armed: isArmed },
            location: {
              heading,
              lat: latitude,
              lng: longitude,
              relative_alt: altitude
            },
            speed: { air_speed: speed }
          }
        } = data
        const droneInfo = {
          timeStamp,
          roll,
          yaw,
          pitch,
          voltage,
          percentage,
          hpop,
          gpsCount,
          mode,
          isArmed,
          heading,
          latitude,
          longitude,
          altitude,
          speed
        }
        store.dispatch('drone/setDroneInfo', droneInfo)
      }

      if (data.type === 'cmd_ack') {
        const formattedCmd = formatCommand(data.cmd)
        if (data.cmd_result.includes('ACCEPTED')) {
          message.success(data.cmd_result)
        } else {
          message.error(data.cmd_result)
        }
        store.dispatch('setLogs', formattedCmd)
      }

      if (data.type === 'mission_ack') {
        const formattedCmd = formatCommand(data.mission_result)
        if (data.mission_result.includes('ACCEPTED')) {
          message.success(data.mission_result)
        } else {
          message.error(data.mission_result)
        }
        store.dispatch('setLogs', formattedCmd)
      }

      if (data.type === 'apm_text') {
        store.dispatch('setLogs', formatCommand(data.text))
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.panel {
  height: calc(100vh - 60px);
  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-template-rows: 50% 50%;
  }

  .control {
    width: 100%;
    height: 40%;
    @media (min-width: 800px) {
      width: 100%;
      height: 100%;
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
  }
  .map {
    position: relative;
    width: 100%;
    height: 60%;
    @media (min-width: 800px) {
      grid-column: 2 / 3;
      grid-row: 1 / span 3;
      width: 100%;
      height: 100%;
    }
  }
  .stream {
    position: absolute;
    width: 150px;
    height: 100px;
    bottom: 0.5rem;
    right: 0.5rem;
    z-index: 200;
    transition: all 0.5s ease-in-out 0.3ms;

    @media (min-width: 576px) {
      width: 200px;
      height: 150px;
    }
    @media (min-width: 676px) {
      width: 250px;
      height: 200px;
    }
    @media (min-width: 800px) {
      box-shadow: none;
      width: 100%;
      height: 100%;
      position: static;
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
