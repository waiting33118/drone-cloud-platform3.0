<template>
  <div class="d-flex flex-column align-items-center px-2 py-2">
    <label for="inputNumber">
      <slot />
    </label>
    <input
      id="inputNumber"
      type="number"
      class="form-control text-center mt-4"
      min="1"
      max="100"
      step="0.5"
    >
  </div>
</template>

<script>

export default {
  name: 'InputNumber',
  setup () {
  }
}
</script>
