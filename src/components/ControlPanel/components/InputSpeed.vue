<template>
  <div class="wrapper">
    <label for="speed"><FontAwesomeIcon :icon="tachometerAlt" /> Speed(m/s)</label>
    <el-slider
      id="speed"
      v-model="speedStatus"
      input-size="mini"
      :min="1"
      :max="14"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { drone } from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  name: 'InputSpeed',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const store = useStore()
    const tachometerAlt = computed(() => faTachometerAlt)
    const speedStatus = computed({
      get: () => store.getters['Drone/getFlightSpeed'],
      set: speed => store.dispatch('Drone/setFlightSpeed', Number(speed))
    })
    const handleChange = () => drone.changeSpeed(speedStatus.value)
    return {
      tachometerAlt,
      speedStatus,
      handleChange
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 0 10px;
}
</style>
