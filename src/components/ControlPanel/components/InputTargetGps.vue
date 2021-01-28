<template>
  <div class="d-flex justify-content-center px-2 py-2">
    <form class="input-group d-flex align-items-center">
      <FontAwesomeIcon
        :icon="mapMark"
        class="me-2"
        style="color:blue"
      />
      <span class="input-group-text">Lng</span>
      <input
        v-model="coords.lng"
        type="text"
        class="form-control text-center"
        disabled
        readonly
      >
      <span class="input-group-text">Lat</span>
      <input
        v-model="coords.lat"
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
import { useStore } from 'vuex'
export default {
  name: 'InputTargetGps',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const store = useStore()
    const mapMark = computed(() => faMapMarkedAlt)
    const coords = computed(() => store.getters['Drone/getTargetGps'])
    return {
      mapMark,
      coords
    }
  }
}
</script>

<style>

</style>
