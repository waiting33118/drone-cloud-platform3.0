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
  >
  <input
    class="form-control"
    type="text"
    placeholder="Disabled readonly input"
    aria-label="Disabled input example"
    disabled
    readonly
  >
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Range',
  setup (prop, { emit }) {
    const rangeValue = ref(0)
    return {
      rangeValue
    }
  }
}
</script>

<style>

</style>
