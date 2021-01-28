<template>
  <div class="d-flex flex-column align-items-center px-2 py-2">
    <label for="inputAltitude">
      <FontAwesomeIcon :icon="arrowsV" />
      Altitude
    </label>
    <input
      id="inputAltitude"
      v-model="flightStatus"
      type="number"
      class="form-control text-center mt-4"
      min="1"
      max="100"
      step="0.5"
      @change="handleChange"
    >
  </div>
</template>

<script>
import { goto } from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'InputAltitude',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const store = useStore()
    const arrowsV = computed(() => faArrowsAltV)
    const flightStatus = computed({
      get: () => store.getters['Drone/getCurrentAltitude'],
      set: altitude => {
        store.dispatch('Drone/setFlightAltitude', altitude)
        const { lng, lat } = store.getters['Drone/getTargetGps']
        if (lng && lat) return goto(lng, lat, altitude)
        // Use current gps coords if default's target gps haven't set yet
        const { lng: currentLng, lat: currentLat } = store.getters['Drone/getCurrentGps']
        goto(currentLng, currentLat, altitude)
      }
    })
    return {
      arrowsV,
      flightStatus
    }
  }
}
</script>
