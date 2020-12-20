<template>
  <label
    for="range"
    class="form-label"
  ><slot /></label>
  <input
    id="range"
    v-model="rangeValue"
    type="range"
    class="form-range"
    step="0.5"
    min="1"
    max="100"
    @change="changeEmit"
  >
  <input
    class="form-control text-center w-50 mx-auto"
    type="text"
    :placeholder="rangeValue"
    disabled
    readonly
  >
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Range',
  emits: ['handleRangeEmit'],
  setup (prop, { emit }) {
    const rangeValue = ref(3)
    const changeEmit = () => emit('handleRangeEmit', rangeValue.value)
    return {
      rangeValue,
      changeEmit
    }
  }
}
</script>

<style>

</style>
