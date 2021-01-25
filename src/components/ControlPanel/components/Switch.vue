<template>
  <div class="form-check form-switch d-flex justify-content-center align-items-center m-0 py-2">
    <input
      id="switchCheck"
      class="form-check-input fs-4 me-3"
      type="checkbox"
    >
    <label
      class="form-check-label"
      for="switchCheck"
    >
      <slot />
    </label>
  </div>
</template>

<script>
export default {
  name: 'Switch',
  setup () {

  }
}
</script>
