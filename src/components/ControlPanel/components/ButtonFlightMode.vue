<template>
  <el-button-group
    class="button-group"
  >
    <el-button
      type="primary"
      plain
      class="btn-change-mode"
      @click="handleClick('GUIDED')"
    >
      GUIDED
    </el-button>
    <el-button
      type="primary"
      plain
      class="btn-change-mode"
      @click="handleClick('RTL')"
    >
      RTL
    </el-button>
  </el-button-group>
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
        store.dispatch('Drone/setFlightAltitude', 3)
        store.dispatch('Drone/setFlightSpeed', 3)
        store.dispatch('Drone/setTargetLocation', { longitude: '', latitude: '' })
        store.dispatch('Drone/setYaw', 0)
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
.button-group {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.btn-change-mode {
  width: 200px;
}
</style>
