<template>
  <form class="input-group">
    <FontAwesomeIcon
      class="me-2 my-auto"
      :icon="mapMarkAlt"
      style="color:blue"
    />
    <input
      id="longitude"
      v-model="coordinate.longitude"
      type="text"
      class="form-control text-center"
      disabled
      readonly
    >
    <input
      v-model="coordinate.latitude"
      type="text"
      class="form-control text-center"
      disabled
      readonly
    >
    <button
      id="button-addon2"
      class="btn btn-outline-primary"
      type="submit"
      @click.prevent=""
    >
      GOTO
    </button>
  </form>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { computed, reactive } from 'vue'
export default {
  name: 'Form',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const coordinate = reactive({
      longitude: '-',
      latitude: '-'
    })

    /**
     * FontAwesome implementation
     */
    const mapMarkAlt = computed(() => faMapMarkedAlt)
    return {
      coordinate,
      mapMarkAlt
    }
  }
}
</script>
