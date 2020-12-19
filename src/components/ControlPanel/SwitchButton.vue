<template>
  <div class="form-check form-switch">
    <input
      id="flexSwitchCheckDefault"
      v-model="buttonValue"
      class="form-check-input"
      type="checkbox"
      @change="changeEmit"
    >
    <label
      class="form-check-label"
      for="flexSwitchCheckDefault"
    >
      <slot />
    </label>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'SwitchButton',
  emits: ['handleButtonEmit'],
  setup (props, { emit }) {
    const buttonValue = ref(false)
    const changeEmit = () => emit('handleButtonEmit', buttonValue.value)
    return {
      buttonValue,
      changeEmit
    }
  }
}
</script>
