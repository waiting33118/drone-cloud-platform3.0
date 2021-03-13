<template>
  <div class="wrapper">
    <label for="yaw"><FontAwesomeIcon :icon="locationArrow" />Yaw(Angle)</label>
    <el-slider
      id="yaw"
      v-model="yawStatus"
      input-size="mini"
      :min="0"
      :max="359"
      @change="handleChange"
    />
  </div>
</template>

<script>
import { drone } from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  name: 'InputYaw',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const locationArrow = computed(() => faLocationArrow)
    const store = useStore()
    const yawStatus = computed({
      get: () => store.getters['Drone/getYaw'],
      set: angle => store.dispatch('Drone/setYaw', angle)
    })
    const handleChange = () => drone.changeYaw(yawStatus.value)

    return {
      locationArrow,
      handleChange,
      yawStatus
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 0 10px;
}
</style>
