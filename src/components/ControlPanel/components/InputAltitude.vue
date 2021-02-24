<template>
  <div class="wrapper">
    <label for="altitude"><FontAwesomeIcon :icon="arrowsV" />Altitude</label>
    <el-input-number
      id="altitude"
      v-model="flightStatus"
      size="mini"
      :precision="1"
      :step="0.5"
      :min="1"
      :max="100"
    />
  </div>
</template>

<script>
import { goto } from '../../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'InputAltitude',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const store = useStore()
    const arrowsV = computed(() => faArrowsAltV)
    const flightStatus = computed({
      get: () => store.getters['Drone/getCurrentAltitude'],
      set: altitude => {
        store.dispatch('Drone/setFlightAltitude', altitude)
        const { lng, lat } = store.getters['Drone/getTargetGps']
        if (lng && lat) return goto(lng, lat, altitude)
        // Use current gps coords if default's target gps haven't set yet
        const { lng: currentLng, lat: currentLat } = store.getters['Drone/getCurrentGps']
        goto(currentLng, currentLat, altitude)
      }
    })
    return {
      arrowsV,
      flightStatus
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.el-input-number--mini {
  @media screen and (max-width:1160px) {
    width: 95px;
  }
}

</style>
