<template>
  <el-switch
    v-model="status"
    :disabled="!propsStatus"
    active-color="#13ce66"
    inactive-text="LAND"
    active-text="TAKEOFF"
    @change="handleClick"
  />
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
    const altitude = store.getters['Drone/getCurrentAltitude']
    const handleClick = () => {
      if (status.value) {
        land()
        store.dispatch('Drone/setFlightAltitude', 3)
        store.dispatch('Drone/setFlightSpeed', 3)
        store.dispatch('Drone/setTargetLocation', { longitude: '', latitude: '' })
        store.dispatch('Drone/setYaw', 0)
        return
      }
      takeoff(altitude)
    }

    return {
      propsStatus,
      status,
      handleClick
    }
  }
}
</script>
