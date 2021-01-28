<template>
  <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 py-2">
    <input
      id="switchCheck"
      v-model="status"
      class="form-check-input fs-4 me-3"
      type="checkbox"
      @click="handleClick"
    >
    <label
      class="form-check-label"
      for="switchCheck"
    >
      {{ labelStatus }}
    </label>
  </div>
</template>

<script>
import { takeoff, land } from '../../../api'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'SwitchTakeoff',
  setup () {
    const store = useStore()
    const propsStatus = computed(() => store.getters['Drone/getDronePropsStatus'])
    const flightAltitude = computed(() => store.getters['Drone/getFlightAltitude'])
    const status = computed({
      get: () => propsStatus.value && flightAltitude.value > 0.1,
      set: value => value
    })
    const labelStatus = computed(() => status.value ? 'LAND' : 'TAKEOFF')
    const altitude = store.getters['Drone/getCurrentAltitude']
    const handleClick = () => {
      if (status.value) {
        land()
        store.commit('Drone/setFlightAltitude', 3)
        store.commit('Drone/setFlightSpeed', 3)
        store.commit('Drone/setTargetLocation', { longitude: '', latitude: '' })
        return
      }
      takeoff(altitude)
    }

    return {
      labelStatus,
      status,
      handleClick
    }
  }
}
</script>
