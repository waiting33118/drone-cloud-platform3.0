<template>
  <a-spin
    v-if="isLoading"
    class="map__spinner"
    :spinning="isLoading"
    tip="Loading map..."
  />
  <div id="map" :class="{ map: isLoading }">
    <a-popconfirm
      title="Press Start To Start Mission"
      ok-text="Start"
      cancel-text="Cancel"
      @confirm="missionConfirmHandler"
      @cancel="missionCancelHandler"
      ><a ref="popEl" class="confirm__dialog"
    /></a-popconfirm>
    <DroneDashBoard />
  </div>
</template>

<script>
import CustomMap from '../../lib/mapbox'
import DroneDashBoard from '../Mapbox/DroneDashBoard.vue'
import { computed, onMounted, ref, watch } from '@vue/runtime-core'
import { getUserCurrentLocation } from '../../lib/geolocation'
import socket from '../../lib/websocket'
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
export default {
  name: 'Mapbox',
  components: { DroneDashBoard },
  setup() {
    const popEl = ref(null)
    const isLoading = ref(true)
    let cacheTarget
    let droneMarker
    let targetMarker
    let longitude = 0
    let latitude = 0
    let mapbox
    const store = useStore()
    const isTakeoff = computed(() => store.getters['drone/getTakeoffStatus'])
    const altitude = computed(() => store.getters['drone/getAltitude'])
    const destination = computed(() => store.getters['drone/getDestination'])

    const missionConfirmHandler = () => {
      const { lng, lat } = cacheTarget
      store.dispatch('drone/updateDestination', {
        lng,
        lat
      })
      socket.emit('send-drone', {
        cmd: 'GOTO',
        altitude: altitude.value,
        lng,
        lat
      })
      message.success('Start GOTO Mission')
    }
    const missionCancelHandler = () => {
      const { lng, lat } = destination.value
      if (lng !== 0 && lat !== 0) {
        mapbox.flyTo([lng, lat])
        targetMarker.setLngLat([lng, lat])
      }
    }

    getUserCurrentLocation()
      .then(([lng, lat]) => {
        longitude = lng
        latitude = lat
      })
      .catch(() => {
        message.error(
          'Please accept gps permission to get more accuracy position'
        )
      })
      .finally(() => {
        mapbox = new CustomMap({ longitude, latitude })
        mapbox.initMapbox()
        droneMarker = mapbox.createMarker({
          longitude,
          latitude,
          map: mapbox.map
        })
        targetMarker = mapbox.createMarker({
          color: 'red',
          scale: '0.7',
          longitude,
          latitude,
          map: mapbox.map,
          draggable: true
        })

        targetMarker.on('dragend', () => {
          if (isTakeoff.value) {
            const lngLat = targetMarker.getLngLat()
            cacheTarget = lngLat
            mapbox.flyTo([lngLat.lng, lngLat.lat])
            popEl.value.click()
            return
          }
          message.error('Please TAKEOFF the drone first')
        })
      })

    onMounted(() => {
      isLoading.value = false
    })

    watch(
      () => store.getters['drone/getDroneCoords'],
      (coords) => {
        if (!!coords[0] && !!coords[1]) {
          droneMarker.setLngLat(coords)
        }
      }
    )

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
  position: relative;
  width: 100%;
  height: 100%;

  .confirm__dialog {
    position: absolute;
    top: 49%;
    left: 50%;
  }
}
.map {
  visibility: hidden;
}
.map__spinner {
  position: absolute;
  z-index: 500;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
