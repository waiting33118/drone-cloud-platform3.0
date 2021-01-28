<template>
  <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 py-2">
    <input
      id="switchCheck"
      v-model="propsStatus"
      class="form-check-input fs-4 me-3"
      type="checkbox"
      @click="handleClick"
    >
    <label
      class="form-check-label"
      for="switchCheck"
    >
      {{ status }}
    </label>
  </div>
</template>

<script>
import { arm, disarm } from '../../../api'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'SwitchArm',
  setup () {
    const store = useStore()
    const propsStatus = computed({
      get: () => store.getters['Drone/getDronePropsStatus'],
      set: value => value
    })
    const status = computed(() => propsStatus.value ? 'DISARM' : 'ARM')
    const handleClick = () => propsStatus.value ? disarm() : arm()

    return {
      status,
      propsStatus,
      handleClick
    }
  }
}
</script>
