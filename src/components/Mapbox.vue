<template>
  <div>
    <v-progress-circular
      v-if="isLoading"
      :size="70"
      :width="7"
      indeterminate
      color="purple"
    />
    <v-card
      elevation="2"
      max-width="250"
    >
      <ul>
        <li>
          timestamp: {{ droneInfo.timestamp }}
        </li>
        <li>
          pitch: {{ droneInfo.pitch }}
        </li>
        <li>
          roll: {{ droneInfo.roll }}
        </li>
        <li>
          yaw: {{ droneInfo.yaw }}
        </li>
        <li>
          GPS: {{ droneInfo.lng }},{{ droneInfo.lat }}
        </li>
        <li>
          Altitude: {{ droneInfo.relativeAlt }}
        </li>
        <li>
          Heading: {{ droneInfo.heading }}
        </li>
        <li>
          Battery: {{ droneInfo.voltage }}V /{{ droneInfo.percentage }} %
        </li>
        <li>
          Air Speed: {{ droneInfo.airSpeed }}
        </li>
        <li>
          Filght mode: {{ droneInfo.customMode }}
        </li>
        <li>
          Arm status: {{ droneInfo.isArmed === '0' ? 'DISARM' : 'ARM' }}
        </li>
      </ul>
    </v-card>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { onMounted, ref, reactive, watch } from '@vue/composition-api'
import { getUserLocation } from './../utils/getUserInfo'
export default {
  name: 'Mapbox',
  props: {
    droneStatus: {
      type: Object,
      required: true
    }
  },
  setup (props, { emit }) {
    const isLoading = ref(true)
    const longitude = ref(0)
    const latitude = ref(0)
    const coordsStorage = reactive([])
    const droneInfo = reactive({
      timestamp: '-',
      pitch: '0',
      roll: '0',
      yaw: '0',
      lng: '-',
      lat: '-',
      relativeAlt: '-',
      heading: '0',
      voltage: '0',
      percentage: '0',
      airSpeed: '0',
      customMode: '-',
      isArmed: '0'
    })

    const token = 'pk.eyJ1Ijoid2FpdGluZzMzMTE4IiwiYSI6ImNrZDVlZWp6MjFxcXQyeHF2bW0xenU4YXoifQ.iGfojLdouAjsovJuRxjYVA'

    /**
       * add map token
       */
    mapboxgl.accessToken = token

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
          scale: 1.5,
          draggable: true
        })
          .setLngLat([longitude.value, latitude.value])
          .addTo(map)

        destinationPoint.on('dragend', () => {
          const { lng, lat } = destinationPoint.getLngLat()
          emit('getCurrentPosition', lng, lat)
        })

        /**
         * add drone position marker
         */
        const dronePosition = new mapboxgl.Marker({
          color: 'blue',
          draggable: false
        })
          .setLngLat([longitude.value, latitude.value])
          .addTo(map)

        /**
         * add realtime trace path
         */
        map.addSource('trace', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: coordsStorage
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
            'line-width': 10
          }
        })

        setTimeout(() => { isLoading.value = false }, 1500)

        watch(() => props.droneStatus, (newInfo) => {
          const {
            timestamp,
            attitude: { pitch, roll, yaw },
            location: { lng, lat, relative_alt: relativeAlt, heading },
            battery: { voltage, percentage },
            speed: { air_speed: airSpeed },
            heartbeat: { custom_mode: customMode, is_armed: isArmed }
          } = newInfo
          Object.assign(droneInfo, {
            timestamp,
            lng,
            lat,
            pitch,
            roll,
            yaw,
            relativeAlt,
            heading,
            voltage,
            percentage,
            airSpeed,
            customMode,
            isArmed
          })

          coordsStorage.push([lng, lat])

          map.getSource('trace').setData({
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: coordsStorage
              }
            }]
          })
          map.panTo(coordsStorage[coordsStorage.length - 1])

          dronePosition.setLngLat([lng, lat])
        })
      })
    })
    return {
      isLoading,
      droneInfo,
      coordsStorage
    }
  }
}
</script>

<style lang="scss">
  .mapboxgl-canvas {
    outline: none;
  }
  .v-progress-circular {
    z-index: 1;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .v-card{
    z-index: 1;
    position: absolute;
    top: 10px;
    left: 45px;
  }
</style>
