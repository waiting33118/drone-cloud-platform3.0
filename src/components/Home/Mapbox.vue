<template>
  <div id="map">
    <DroneInformation :drone-info="prop.droneInfo" />
  </div>
</template>

<script>
import DroneInformation from '@/components/Mapbox/DroneInformation.vue'
import mapboxgl from 'mapbox-gl'
import { getUserLocation } from '../../utils/userLocation'
import { onMounted, watch } from 'vue'
import drone from '../../services/drone'
import { gotoMissionCheck } from '../../utils/sweetAlert'
export default {
  name: 'Mapbox',
  components: {
    DroneInformation
  },
  props: {
    droneInfo: {
      type: Object,
      default: () => ({})
    },
    altitude: {
      type: Number,
      default: 3
    }
  },
  emits: ['coordsEmit'],
  setup (prop, { emit }) {
    const coordsTmp = []
    mapboxgl.accessToken = 'pk.eyJ1Ijoid2FpdGluZzMzMTE4IiwiYSI6ImNrZDVlZWp6MjFxcXQyeHF2bW0xenU4YXoifQ.iGfojLdouAjsovJuRxjYVA'

    onMounted(async () => {
      /**
       * fetch user's GPS coordinates
       */
      const { coords: { latitude, longitude } } = await getUserLocation()

      /**
       * Create map instance & binding DOM Element
       */
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/waiting33118/ckdfkx3t10k9w1irkp8anuy39',
        center: [longitude, latitude],
        zoom: 17,
        pitch: 40,
        bearing: 0,
        antialias: true,
        container: 'map'
      })

      map.on('load', () => {
        /**
        * Get label layer ID
        */
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
         * add realtime trace path
         */
        map.addSource('trace', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordsTmp
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

        /**
        * Add Control
        */
        map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right')
        map.addControl(new mapboxgl.FullscreenControl(), 'top-left')
        map.addControl(new mapboxgl.ScaleControl({ maxWidth: 200, unit: 'metric' }), 'bottom-right')
      })

      /**
       * Goto feature
       */
      map.on('contextmenu', async e => {
        const { lng, lat } = e.lngLat
        const coords = {
          lng: Number(lng).toFixed(6),
          lat: Number(lat).toFixed(6)
        }
        const { isConfirmed } = await gotoMissionCheck(coords.lng, coords.lat)
        if (isConfirmed) drone.goto(coords.lng, coords.lat, prop.altitude)
        emit('coordsEmit', coords)
      })

      /**
       * add drone position marker
       */
      const dronePosition = new mapboxgl.Marker({
        color: 'blue',
        draggable: false
      })
        .setLngLat([longitude, latitude]).addTo(map)
      /**
       * Realtime update drone position
       */
      watch(() => prop.droneInfo.location, newValue => {
        const { lng, lat } = newValue
        coordsTmp.push([lng, lat])
        dronePosition.setLngLat([lng, lat])
        if (map.getSource('trace')) {
          map.getSource('trace').setData({
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: coordsTmp
              }
            }]
          })
        }
      })
    })

    return {
      prop
    }
  }
}
</script>
