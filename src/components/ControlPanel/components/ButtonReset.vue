<template>
  <button
    class="btn btn-primary rounded-pill"
    @click="handleClick"
  >
    Reset
  </button>
</template>

<script>
import { gimbalControl } from '../../../api'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'ButtonReset',
  setup () {
    const store = useStore()
    const gimbalY = computed({
      get: () => store.getters['Drone/getGimbalY'],
      set: pwm => {
        store.dispatch('Drone/setGimbalY', pwm)
        gimbalControl('GIMBAL_FRONT_BACK', pwm)
      }
    })
    const gimbalX = computed({
      get: () => store.getters['Drone/getGimbalX'],
      set: pwm => {
        store.dispatch('Drone/setGimbalX', pwm)
        gimbalControl('GIMBAL_LEFT_RIGHT', pwm)
      }
    })
    const handleClick = () => {
      gimbalY.value = 1500
      gimbalX.value = 1500
    }

    return {
      handleClick
    }
  }
}
</script>

<style>

</style>
