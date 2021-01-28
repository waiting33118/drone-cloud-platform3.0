<template>
  <div class="d-flex flex-column align-items-center p-2">
    <label for="inputGimbalY">
      <FontAwesomeIcon :icon="video" />
      Gimbal Front & Back
    </label>

    <input
      id="inputGimbalY"
      v-model="pwmStatus"
      type="range"
      class="form-range"
      min="1200"
      max="1800"
      @change="handleChange"
    >
    <input
      v-model="pwmStatus"
      type="text"
      class="form-control text-center"
      disabled
      readonly
    >
  </div>
</template>

<script>
import { gimbalControl } from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'InputGimbalY',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const store = useStore()
    const video = computed(() => faVideo)
    const pwmStatus = computed({
      get: () => store.getters['Drone/getGimbalY'],
      set: pwm => store.dispatch('Drone/setGimbalY', Number(pwm))
    })
    const handleChange = () => gimbalControl('GIMBAL_FRONT_BACK', pwmStatus.value)
    return {
      video,
      pwmStatus,
      handleChange
    }
  }
}
</script>
