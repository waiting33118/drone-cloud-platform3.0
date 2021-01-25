<template>
  <div class="d-flex flex-column align-items-center px-2 py-2">
    <label for="inputRange">
      <slot />
    </label>

    <input
      id="inputRange"
      type="range"
      class="form-range"
    >
    <input
      type="text"
      class="form-control text-center"
      value="1"
      disabled
      readonly
    >
  </div>
</template>

<script>
export default {
  name: 'InputRange',
  setup () {

  }
}
</script>
