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
import { drone } from '../../../api'
import { useStore } from 'vuex'
import { computed, watchEffect } from '@vue/runtime-core'
export default {
  name: 'ButtonFlightMode',
  setup () {
    const FLIGHT_MODE = {
      GUIDED: 'GUIDED',
      RTL: 'RTL'
    }
    const store = useStore()
    const droneIdAndName = computed(() => store.getters['User/getDroneIdAndName'])
    const flightMode = computed(() => store.getters['Drone/getCurrentFlightMode'])
    const propsStatus = computed(() => store.getters['Drone/getDronePropsStatus'])
    const altitude = computed(() => store.getters['Drone/getFlightAltitude'])

    const handleClick = (mode) => {
      if (mode === 'GUIDED') drone.changeFlightMode(droneIdAndName.value.droneId, FLIGHT_MODE.GUIDED)
      if (mode === 'RTL') {
        drone.changeFlightMode(droneIdAndName.value.droneId, FLIGHT_MODE.RTL)
        store.dispatch('Drone/setFlightAltitude', 3)
        store.dispatch('Drone/setFlightSpeed', 3)
        store.dispatch('Drone/setTargetLocation', { longitude: '', latitude: '' })
        store.dispatch('Drone/setYaw', 0)
      }
    }

    // auto change mode to guide mode when drone is land
    watchEffect(() => {
      if (flightMode.value !== 'GUIDED' && propsStatus.value === false && altitude.value < 0.1) {
        drone.changeFlightMode(droneIdAndName.value.droneId, FLIGHT_MODE.GUIDED)
      }
    })

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
