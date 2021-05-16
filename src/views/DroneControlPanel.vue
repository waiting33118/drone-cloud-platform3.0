<template>
  <div
    v-loading="fullscreenLoading"
    element-loading-background="rgba(255, 255, 255)"
    class="container"
  >
    <ControlPanel class="control-panel" />
    <Stream class="stream" />
    <Mapbox class="mapbox" />
  </div>
</template>

<script>
import { socket, useMessageParse } from '../utils'
import Mapbox from '@/components/DroneControlPanel/Mapbox.vue'
import ControlPanel from '@/components/DroneControlPanel/ControlPanel.vue'
import Stream from '@/components/DroneControlPanel/Stream.vue'
import { computed, onBeforeUnmount, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  name: 'DroneControlPanel',
  components: {
    Mapbox,
    ControlPanel,
    Stream
  },
  setup () {
    const store = useStore()
    const userInfo = computed(() => store.getters['User/getUserInfo'])
    const fullscreenLoading = ref(true)

    store.dispatch('Drone/connect', socket.id)
    socket.emit('mqttSubscribe', userInfo.value)

    socket.io.on('reconnect', () => socket.emit('mqttSubscribe', droneIdAndName.value))

    socket.on('disconnect', reason => store.dispatch('Drone/disconnect', reason))

    // drone information
    socket.on(`${userInfo.value.droneId}/message`, ({ Drone: drone, Phone: phone }) => {
      store.dispatch('Drone/setDroneInfo', { ...drone, ...phone })
    })
    // drone command ack
    socket.on(`${userInfo.value.droneId}/cmd_ack`, ({ cmd, cmd_result: result }) => {
      store.dispatch('Drone/setACK', { cmd, result })
      useMessageParse(cmd, result)
    })
    // drone mission ack
    socket.on(`${userInfo.value.droneId}/mission_ack`, ({ mission_result: result }) => {
      store.dispatch('Drone/setMission', { result })
      useMessageParse(null, result)
    })
    // drone debug text
    socket.on(`${userInfo.value.droneId}/apm_text`, data => {
      store.dispatch('Drone/setApm', data)
    })

    onMounted(() => {
      setTimeout(() => {
        fullscreenLoading.value = false
      }, 1000)
    })

    onBeforeUnmount(() => {
      socket.emit('mqttUnsubscribe', userInfo.value.droneId)
    })
    return {
      fullscreenLoading
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: repeat(3,1fr);
  >.control-panel{
    border: 1px solid #dcdfe6;
  }
  >.stream{
    border: 1px solid #dcdfe6;
  }
  >.mapbox{
    border: 1px solid #dcdfe6;
    position: relative;
  }
  @media screen and (min-width:768px) {
    height: calc(100% - 61px);
    overflow: hidden;
    grid-template-columns: repeat(2,50%);
    grid-template-rows: repeat(2,minmax(calc((100vh - 61px) / 2),1fr));
    >.control-panel{
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    >.stream{
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
    >.mapbox{
      grid-column: 2 / 3;
      grid-row: 1 / span 3;
    }
  }
  @media screen and (min-width:992px) {
    grid-template-columns: repeat(5,minmax(auto,calc(100% / 5)));
    >.control-panel{
      grid-column: 1 / 3;
    }
    >.stream{
      grid-column: 1 / 3;
    }
    >.mapbox{
      grid-column: 3 / span 6;
    }
  }
}
</style>

<style lang="scss">
.mapboxgl-canvas {
  outline: none;
}
</style>
