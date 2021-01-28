<template>
  <div class=" d-flex justify-content-center px-2 py-2">
    <div
      class="btn-group"
    >
      <input
        id="Guided"
        type="radio"
        name="btnradio"
        class="btn-check"
        autocomplete="off"
        :checked="flightMode === 'GUIDED'"
        @click="handleClick('GUIDED')"
      >
      <label
        for="Guided"
        class="btn btn-outline-primary"
      >GUIDED</label>
      <input
        id="RTL"
        type="radio"
        name="btnradio"
        class="btn-check"
        autocomplete="off"
        :checked="flightMode === 'RTL'"
        @click="handleClick('RTL')"
      >
      <label
        for="RTL"
        class="btn btn-outline-primary"
      >RTL</label>
    </div>
  </div>
</template>

<script>
import { changeFlightMode } from '../../../api'
import { computed, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'ButtonFlightMode',
  setup () {
    const FLIGHT_MODE = {
      GUIDED: 'GUIDED',
      RTL: 'RTL'
    }
    const store = useStore()
    const flightMode = computed(() => store.getters['Drone/getCurrentFlightMode'])
    const propsStatus = computed(() => store.getters['Drone/getDronePropsStatus'])
    const altitude = computed(() => store.getters['Drone/getFlightAltitude'])

    const handleClick = (mode) => {
      if (mode === 'GUIDED') changeFlightMode(FLIGHT_MODE.GUIDED)
      if (mode === 'RTL') {
        changeFlightMode(FLIGHT_MODE.RTL)
        store.commit('Drone/setFlightAltitude', 3)
        store.commit('Drone/setFlightSpeed', 3)
        store.commit('Drone/setTargetLocation', { longitude: '', latitude: '' })
      }
    }

    watch(() => store.getters['Drone/getCurrentFlightMode'], () => {
      if (flightMode.value !== 'GUIDED' && propsStatus.value === false && altitude.value < 0.1) {
        changeFlightMode(FLIGHT_MODE.GUIDED)
      }
    }, { deep: true })
    return {
      flightMode,
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-outline-primary{
  width: 200px;
}
</style>
