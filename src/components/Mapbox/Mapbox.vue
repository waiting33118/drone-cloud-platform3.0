<template>
  <a-spin
    v-if="isLoading"
    class="map__spinner"
    :spinning="isLoading"
    tip="Loading map..."
  />

  <a-popconfirm
    title="Press Start To Start Mission"
    ok-text="Start"
    cancel-text="Cancel"
    @confirm="missionConfirmHandler"
    @cancel="missionCancelHandler"
    ><a ref="popEl" class="confirm__dialog"
  /></a-popconfirm>

  <div id="map" :class="{ map: isLoading }">
    <DroneDashBoard />
  </div>
</template>

<script>
import CustomMap from '../../lib/mapbox'
import DroneDashBoard from '../Mapbox/DroneDashBoard.vue'
import { computed, onMounted, ref, watch } from '@vue/runtime-core'
import { geolocation } from '../../lib/geolocation'
import socket from '../../lib/websocket'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
export default {
  name: 'Mapbox',
  components: { DroneDashBoard },
  setup() {
    const popEl = ref(null)
    const isLoading = ref(true)
    const store = useStore()
    const isTakeoff = computed(() => store.getters['drone/getTakeoffStatus'])
    const altitude = computed(() => store.getters['drone/getAltitude'])
    const destination = computed(() => store.getters['drone/getDestination'])
    const mapbox = new CustomMap()

    const missionConfirmHandler = () => {
      socket.emit('send-drone', {
        cmd: 'GOTO',
        altitude: altitude.value,
        lng: destination.value.lng,
        lat: destination.value.lat
      })
      message.success('Start GOTO Mission')
    }
    const missionCancelHandler = () => message.error('Mission canceled')

    onMounted(async () => {
      let droneMarker
      let targetMarker
      try {
        await mapbox.initMapbox()

        const [longitude, latitude] = await geolocation
        droneMarker = mapbox.createMarker({
          longitude,
          latitude,
          map: mapbox.map
        })
        targetMarker = mapbox.createMarker({
          color: 'red',
          scale: '0.5',
          longitude,
          latitude,
          map: mapbox.map
        })

        mapbox.map.on('contextmenu', ({ lngLat }) => {
          if (isTakeoff.value) {
            store.dispatch('drone/updateDestination', {
              lng: lngLat.lng,
              lat: lngLat.lat
            })
            mapbox.flyTo([lngLat.lng, lngLat.lat])
            targetMarker.setLngLat([lngLat.lng, lngLat.lat])
            popEl.value.click()
            return
          }
          message.error('Please TAKEOFF the drone first')
        })

        watch(
          () => store.getters['drone/getDroneCoords'],
          (coords) => {
            if (!!coords[0] && !!coords[1]) {
              droneMarker.setLngLat(coords)
            }
          }
        )

        setTimeout(() => {
          isLoading.value = false
        }, 1000)
      } catch (error) {
        store.dispatch('setLogs', error)
      }
    })
    return {
      isLoading,
      popEl,
      missionConfirmHandler,
      missionCancelHandler
    }
  }
}
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
  position: relative;
}
.map {
  visibility: hidden;
}
.map__spinner {
  z-index: 50;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.confirm__dialog {
  position: absolute;
  top: 49%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
