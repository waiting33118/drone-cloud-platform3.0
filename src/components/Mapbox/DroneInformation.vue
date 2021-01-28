<template>
  <ul class="drone-info">
    <li>{{ `TimeStamp: ${info.timestamp}` }}</li>
    <li>{{ `Device ID: ${info.deviceId}` }}</li>
    <li>{{ `GPS: ${info.longitude} ${info.latitude}` }}</li>
    <li>{{ `Heading: ${info.heading}` }}</li>
    <li>{{ `Altitude: ${info.relativeAltitude}` }}</li>
    <li>{{ `AirSpeed: ${info.airSpeed}` }}</li>
    <li>{{ `FlightMode: ${info.flightMode}` }}</li>
    <li>{{ `ARM status: ${info.isArm ? 'ARM' : 'DISARM'}` }}</li>
    <li>{{ `Attitude: Pitch: ${info.pitch} Roll: ${info.roll} Yaw: ${info.yaw}` }}</li>
    <li>{{ `Voltage: ${info.voltage} V` }}</li>
    <li>{{ `Battery%: ${info.percentage} %` }}</li>
    <li>{{ `GPS Count: ${info.gpsCount}` }}</li>
    <li>{{ `HPOP: ${info.hpop}` }}</li>
  </ul>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'DroneInformation',
  setup () {
    const store = useStore()
    const info = computed(() => store.getters['Drone/getDroneInfo'])

    return {
      info
    }
  }
}
</script>

<style lang="scss" scoped>
  .drone-info {
    backdrop-filter: blur(15px);
    border-radius: 5px;
    box-shadow: 0px 0px 6px 5px rgba(0,0,0,0.45);
    font-size: 12px;
    overflow-y: auto;
    padding: 5px;
    position: absolute;
    top: 10px;
    left: 50px;
    width: 260px;
    z-index: 1;
    list-style:none;
    text-align: left;
    @media screen and (max-width: 992px) {
      height: 100px;
    }
  }
</style>
