<template>
  <div class="panel">
    <ControlPanel
      class="control"
      :coords="coords"
    />
    <Mapbox
      id="map"
      @getCurrentPosition="getCurrentPosition"
    />
    <Stream class="stream" />
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
import ControlPanel from './../components/ControlPanel'
import Mapbox from './../components/Mapbox'
import Stream from './../components/Stream'
export default {
  name: 'Home',
  components: {
    ControlPanel,
    Mapbox,
    Stream
  },
  setup () {
    const coords = reactive({
      lng: 0,
      lat: 0
    })

    /**
     * @param lng number
     * @param lat number
     */
    const getCurrentPosition = (lng, lat) => {
      coords.lng = lng
      coords.lat = lat
    }

    return {
      coords,
      getCurrentPosition
    }
  }
}
</script>

<style lang="scss">
  .panel{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(7,minmax(auto,500px));
    grid-template-rows: repeat(2,minmax(250px,1fr));
    > .control {
      grid-column: 1 / 2;
      grid-row: 1;
      border: 2px solid gainsboro;
    }
    > #map {
      grid-column: 2 / 8;
      grid-row: 1 / span 2;
      border: 2px solid gainsboro;
    }
    > .stream {
      width: 500px;
      grid-column: 1 / 2;
      grid-row: 2;
      border: 2px solid gainsboro;
    }
  }
</style>
