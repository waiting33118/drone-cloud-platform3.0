<template>
  <div class="slider-wrapper">
    <label for="slider"><FontAwesomeIcon :icon="video" />Gimbal Front & Back</label>
    <el-slider
      id="slider"
      v-model="pwmStatus"
      :min="1200"
      :max="1800"
      :marks="marks"
      @change="handleChange"
    />
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
    const marks = {
      1200: {
        style: {
          color: '#1989FA'
        },
        label: '1200(Front)'
      },
      1500: {
        style: {
          color: '#1989FA'
        },
        label: '1500(Center)'
      },
      1800: {
        style: {
          color: '#1989FA'
        },
        label: '1800(Back)'
      }
    }
    const store = useStore()
    const video = computed(() => faVideo)
    const pwmStatus = computed({
      get: () => store.getters['Drone/getGimbalY'],
      set: pwm => store.dispatch('Drone/setGimbalY', pwm)
    })
    const handleChange = () => gimbalControl('GIMBAL_FRONT_BACK', pwmStatus.value)

    return {
      video,
      pwmStatus,
      handleChange,
      marks
    }
  }
}
</script>
<style lang="scss" scoped>
.slider-wrapper {
  text-align: center;
}
</style>
