<template>
  <div class="d-flex flex-column align-items-center p-2">
    <label for="inputRange">
      <FontAwesomeIcon :icon="tachometerAlt" />
      Speed(m/s)
    </label>

    <input
      id="inputRange"
      v-model="speedStatus"
      type="range"
      class="form-range"
      min="1"
      max="14"
      @change="handleChange"
    >
    <input
      v-model="speedStatus"
      type="text"
      class="form-control text-center"
      disabled
      readonly
    >
  </div>
</template>

<script>
import { changeSpeed } from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useStore } from 'vuex'
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
    const handleChange = () => changeSpeed(speedStatus.value)
    return {
      tachometerAlt,
      speedStatus,
      handleChange
    }
  }
}
</script>
