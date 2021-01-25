<template>
  <div class=" d-flex justify-content-center px-2 py-2">
    <form class="input-group d-flex align-items-center">
      <FontAwesomeIcon
        :icon="mapMark"
        class="me-2"
        style="color:blue"
      />
      <input
        type="text"
        class="form-control text-center"
        disabled
        readonly
      >
      <input
        type="text"
        class="form-control text-center"
        disabled
        readonly
      >
    </form>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
export default {
  name: 'InputGroups',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const mapMark = computed(() => faMapMarkedAlt)

    return {
      mapMark
    }
  }
}
</script>

<style>

</style>
