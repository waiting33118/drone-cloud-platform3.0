<template>
  <div class=" d-flex justify-content-center px-2 py-2">
    <div
      class="btn-group"
    >
      <input
        id="Guided"
        type="radio"
        name="btnradio"
        class="btn-check"
        autocomplete="off"
      >
      <label
        for="Guided"
        class="btn btn-outline-primary"
      >GUIDED</label>
      <input
        id="RTL"
        type="radio"
        name="btnradio"
        class="btn-check"
        autocomplete="off"
      >
      <label
        for="RTL"
        class="btn btn-outline-primary"
      >RTL</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroups',
  setup () {

  }
}
</script>

<style lang="scss" scoped>
.btn-outline-primary{
  width: 200px;
}
</style>
