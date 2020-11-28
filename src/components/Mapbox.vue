<template>
  <div>
    <v-progress-circular
      v-if="isLoading"
      :size="70"
      :width="7"
      indeterminate
      color="purple"
    />
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { onMounted, ref } from '@vue/composition-api'
import { getUserLocation } from './../utils/getUserInfo'
export default {
  name: 'Mapbox',
  setup (props, { emit }) {
    const isLoading = ref(true)
    const longitude = ref(0)
    const latitude = ref(0)

    onMounted(async () => {
      /**
       * set costum location
       */
      const setUserLocation = async () => {
        const { coords } = await getUserLocation()
        longitude.value = coords.longitude
        latitude.value = coords.latitude
      }
      await setUserLocation()

      const token = 'pk.eyJ1Ijoid2FpdGluZzMzMTE4IiwiYSI6ImNrZDVlZWp6MjFxcXQyeHF2bW0xenU4YXoifQ.iGfojLdouAjsovJuRxjYVA'

      /**
       * add map token
       */
      mapboxgl.accessToken = token

      /**
       * Create map instance & binding DOM Element
       */
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/waiting33118/ckdfkx3t10k9w1irkp8anuy39',
        center: { lng: longitude.value, lat: latitude.value },
        zoom: 17,
        pitch: 55,
        bearing: 0,
        antialias: true,
        container: 'map'
      })

      /**
       * Get label layer ID
       */
      map.on('load', () => {
        const layers = map.getStyle().layers
        let labelLayerId
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
            labelLayerId = layers[i].id
            break
          }
        }

        /**
         * Add 3D building layer
         */
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

        /**
         * Add controls
         */
        map.addControl(new mapboxgl.NavigationControl({
          visualizePitch: true
        }), 'top-right')
        map.addControl(new mapboxgl.FullscreenControl(), 'top-left')
        map.addControl(new mapboxgl.ScaleControl({
          maxWidth: 200,
          unit: 'metric'
        }), 'bottom-right')

        /**
         * add destination marker
         */
        const destinationPoint = new mapboxgl.Marker({
          color: 'red',
          draggable: true
        })
          .setLngLat([longitude.value, latitude.value])
          .addTo(map)

        destinationPoint.on('dragend', () => {
          const { lng, lat } = destinationPoint.getLngLat()
          emit('getCurrentPosition', lng, lat)
        })

        setTimeout(() => { isLoading.value = false }, 1500)
      })
    })
    return {
      isLoading
    }
  }
}
</script>

<style lang="scss">
  .mapboxgl-canvas {
    outline: none;
  }
  .v-progress-circular {
    z-index: 10;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
