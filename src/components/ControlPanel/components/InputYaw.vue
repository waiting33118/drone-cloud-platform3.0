<template>
  <div class="d-flex flex-column align-items-center px-2 py-2">
    <label for="inputRange">
      <FontAwesomeIcon :icon="locationArrow" />
      Yaw (Angle)
    </label>

    <input
      id="inputRange"
      v-model="yawStatus"
      type="range"
      class="form-range"
      min="0"
      max="359"
      step="1"
      @change="handleChange"
    >
    <input
      v-model="yawStatus"
      type="text"
      class="form-control text-center"
      disabled
      readonly
    >
  </div>
</template>

<script>
import { changeYaw } from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'InputYaw',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const store = useStore()
    const locationArrow = computed(() => faLocationArrow)
    let tmpYaw = 0
    const yawStatus = computed({
      get: () => store.getters['Drone/getCurrentYaw'],
      set: yaw => { tmpYaw = Number(yaw) }
    })

    const handleChange = () => changeYaw(tmpYaw)

    return {
      locationArrow,
      yawStatus,
      handleChange
    }
  }
}
</script>
