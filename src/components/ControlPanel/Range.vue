<template>
  <label
    for="range"
    class="form-label mb-0"
  ><slot /></label>
  <input
    id="range"
    v-model="rangeValue"
    type="range"
    class="form-range"
    :step="prop.step"
    :min="prop.min"
    :max="prop.max"
    @change="changeEmit"
  >
  <input
    class="form-control text-center w-75 mx-auto"
    type="text"
    :placeholder="rangeValue"
    disabled
    readonly
  >
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'Range',
  props: {
    rangeStatus: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      required: true
    }
  },
  emits: ['handleRangeEmit'],
  setup (prop, { emit }) {
    const rangeValue = ref(prop.rangeStatus)
    const changeEmit = () => emit('handleRangeEmit', rangeValue.value)

    watch(prop, newValue => { rangeValue.value = newValue.rangeStatus })

    return {
      rangeValue,
      changeEmit,
      prop
    }
  }
}
</script>

<style>

</style>
