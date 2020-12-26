<template>
  <div
    class="btn-group w-100"
    role="group"
  >
    <input
      id="btnradio2"
      type="radio"
      class="btn-check"
      name="btnradio"
      checked
      autocomplete="off"
      @click="handleGuided"
    >
    <label
      class="btn btn-outline-primary"
      for="btnradio2"
    >GUIDED</label>

    <input
      id="btnradio3"
      type="radio"
      class="btn-check"
      name="btnradio"
      autocomplete="off"
      @click="handleRtl"
    >
    <label
      class="btn btn-outline-primary"
      for="btnradio3"
    >RTL</label>
  </div>
</template>

<script>
import drone from '../../services/drone'
export default {
  name: 'ButtonGroup',
  setup () {
    const FLIGHT_MODE = {
      GUIDED: 'GUIDED',
      RTL: 'RTL'
    }
    const handleGuided = () => drone.changeFlightMode(FLIGHT_MODE.GUIDED)
    const handleRtl = () => drone.changeFlightMode(FLIGHT_MODE.RTL)
    return {
      handleGuided,
      handleRtl
    }
  }
}
</script>
