<template>
  <form class="input-group">
    <FontAwesomeIcon
      class="me-2 my-auto"
      :icon="mapMarkAlt"
      style="color:blue"
    />
    <span class="my-auto mx-1">Target GPS</span>
    <input
      id="longitude"
      v-model="coordinate.lng"
      type="text"
      class="form-control text-center"
      disabled
      readonly
    >
    <input
      v-model="coordinate.lat"
      type="text"
      class="form-control text-center"
      disabled
      readonly
    >
  </form>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { computed, reactive, watch } from 'vue'
export default {
  name: 'Form',
  components: {
    FontAwesomeIcon
  },
  props: {
    targetGps: {
      type: Object,
      default: () => ({})
    }
  },
  setup (prop) {
    const coordinate = reactive({
      lng: '-',
      lat: '-'
    })

    /**
     * FontAwesome implementation
     */
    const mapMarkAlt = computed(() => faMapMarkedAlt)

    watch(() => prop.targetGps, newCoords => {
      Object.assign(coordinate, newCoords)
    })

    return {
      coordinate,
      mapMarkAlt
    }
  }
}
</script>
