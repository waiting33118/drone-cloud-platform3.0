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
import { ref, watch } from 'vue'
export default {
  name: 'SwitchButton',
  props: {
    buttonStatus: {
      type: Boolean,
      required: true
    }
  },
  emits: ['handleButtonEmit'],
  setup (props, { emit }) {
    const buttonValue = ref(props.buttonStatus)
    const changeEmit = () => emit('handleButtonEmit', buttonValue.value)

    watch(props, (newValue) => { buttonValue.value = newValue.buttonStatus })
    return {
      buttonValue,
      changeEmit
    }
  }
}
</script>
