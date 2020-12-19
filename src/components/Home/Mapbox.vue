<template>
  <div id="map" />
</template>

<script>
import mapboxgl from 'mapbox-gl'
import { onMounted } from 'vue'
export default {
  name: 'Mapbox',
  setup () {
    onMounted(() => {
      mapboxgl.accessToken = 'pk.eyJ1Ijoid2FpdGluZzMzMTE4IiwiYSI6ImNrZDVlZWp6MjFxcXQyeHF2bW0xenU4YXoifQ.iGfojLdouAjsovJuRxjYVA'
      /**
       * Create map instance & binding DOM Element
       */
      const map = new mapboxgl.Map({
        style: 'mapbox://styles/waiting33118/ckdfkx3t10k9w1irkp8anuy39',
        center: [121, 24],
        zoom: 17,
        pitch: 55,
        bearing: 0,
        antialias: true,
        container: 'map'
      })
      console.log(map)
    })
    return {

    }
  }
}
</script>

<style>

</style>
