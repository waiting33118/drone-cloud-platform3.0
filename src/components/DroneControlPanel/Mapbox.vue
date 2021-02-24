<template>
  <div
    id="map"
    v-loading="fullscreenLoading"
    element-loading-background="rgba(255, 255, 255)"
  >
    <DroneInformation />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import DroneInformation from '@/components/Mapbox/DroneInformation.vue'
import { goto } from '../../api'
import { getUserLocation, useGotoMissionConfirm } from '../../utils'
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'Mapbox',
  components: {
    DroneInformation
  },
  setup () {
    const fullscreenLoading = ref(true)
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2FpdGluZzMzMTE4IiwiYSI6ImNrZDVlZWp6MjFxcXQyeHF2bW0xenU4YXoifQ.iGfojLdouAjsovJuRxjYVA'
    const store = useStore()

    onMounted(async () => {
      // Get user's GPS coordinates
      const { longitude, latitude } = await getUserLocation()
      store.dispatch('Drone/setUserLocation', { longitude, latitude })

      // Create map instance & binding DOM Element
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/waiting33118/ckdfkx3t10k9w1irkp8anuy39',
        center: [longitude, latitude],
        zoom: 17,
        pitch: 0,
        bearing: 0,
        antialias: true,
        container: 'map'
      })

      map.on('load', () => {
        // Get label layer ID
        const layers = map.getStyle().layers
        let labelLayerId
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id
            break
          }
        }

        // Add 3D building layer
        map.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 17,
            paint: {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          },
          labelLayerId
        )

        // add realtime trace path
        map.addSource('trace', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: computed(() => store.getters['Drone/getTmpCoords'])
            }
          }
        })
        map.addLayer({
          id: 'trace',
          type: 'line',
          source: 'trace',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': 'yellow',
            'line-opacity': 0.75,
            'line-width': 5
          }
        })

        // Add Control
        map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')
        map.addControl(new mapboxgl.FullscreenControl(), 'top-left')
        map.addControl(new mapboxgl.ScaleControl({ maxWidth: 200, unit: 'metric' }), 'bottom-right')
      })

      // Goto feature
      map.on('contextmenu', async e => {
        const { lng, lat } = e.lngLat
        const coords = {
          longitude: Number(lng).toFixed(6),
          latitude: Number(lat).toFixed(6)
        }
        const { isConfirmed } = await useGotoMissionConfirm(coords.longitude, coords.latitude)
        if (isConfirmed) {
          store.dispatch('Drone/setTargetLocation', { ...coords })
          const propsStatus = store.getters['Drone/getDronePropsStatus']
          if (propsStatus) {
            const flightAltitude = store.getters['Drone/getCurrentAltitude']
            goto(lng, lat, flightAltitude)
          }
          // TODO: Alert when drone isn't takeoff
        }
      })

      // add drone position marker
      const dronePosition = new mapboxgl.Marker({
        color: 'blue',
        draggable: false
      })
        .setLngLat([longitude, latitude]).addTo(map)

      // Realtime update drone position
      watch(store.getters['Drone/getTmpCoords'], data => {
        if (map.getSource('trace')) {
          dronePosition.setLngLat([data[data.length - 1][0], data[data.length - 1][1]])
          map.getSource('trace').setData({
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: data
              }
            }]
          })
        }
      })

      setTimeout(() => {
        fullscreenLoading.value = false
      }, 1000)
    })
    return {
      fullscreenLoading
    }
  }
}
</script>
