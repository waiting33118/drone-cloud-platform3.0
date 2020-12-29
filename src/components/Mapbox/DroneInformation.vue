<template>
  <ul class="drone-info">
    <li>{{ `TimeStamp: ${droneSource.timestamp}` }}</li>
    <li>{{ `Device ID: ${droneSource.deviceId}` }}</li>
    <li>{{ `Longitude: ${droneSource.lng}` }}</li>
    <li>{{ `Latitude: ${droneSource.lat}` }}</li>
    <li>{{ `Heading: ${droneSource.heading}` }}</li>
    <li>{{ `Altitude: ${droneSource.relativeAlt}` }}</li>
    <li>{{ `AirSpeed: ${droneSource.airSpeed}` }}</li>
    <li>{{ `FlightMode: ${droneSource.flightMode}` }}</li>
    <li>{{ `ARM status: ${droneSource.isArmed === '0'? 'DISARM' : 'ARM'}` }}</li>
    <li>{{ `Attitude: Pitch: ${droneSource.pitch} Roll: ${droneSource.roll} Yaw: ${droneSource.yaw}` }}</li>
    <li>{{ `Voltage: ${droneSource.voltage} V` }}</li>
    <li>{{ `Battery%: ${droneSource.percentage} %` }}</li>
    <li>{{ `GPS Count: ${droneSource.gpsCount}` }}</li>
    <li>{{ `HPOP: ${droneSource.hpop}` }}</li>
  </ul>
</template>

<script>
import { reactive, watch } from 'vue'
export default {
  name: 'DroneInformation',
  props: {
    droneInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup (prop) {
    const droneSource = reactive({
      timestamp: '---',
      deviceId: '---',
      lng: 0,
      lat: 0,
      heading: 0,
      relativeAlt: 0,
      airSpeed: 0,
      flightMode: '---',
      isArmed: '---',
      pitch: 0,
      roll: 0,
      yaw: 0,
      voltage: 0,
      percentage: 0,
      gpsCount: 0,
      hpop: '---'
    })

    watch(() => prop.droneInfo, newValue => {
      const {
        timestamp,
        device_id: deviceId,
        location: {
          lng,
          lat,
          heading,
          relative_alt: relativeAlt
        },
        speed: { air_speed: airSpeed },
        heartbeat: {
          flight_mode: flightMode,
          is_armed: isArmed
        },
        attitude: {
          pitch,
          roll,
          yaw
        },
        battery: {
          voltage,
          percentage
        },
        gps_status: {
          gps_count: gpsCount,
          hpop
        }
      } = newValue

      Object.assign(droneSource, {
        timestamp,
        deviceId,
        lng,
        lat,
        heading,
        relativeAlt,
        airSpeed,
        flightMode,
        isArmed,
        pitch,
        roll,
        yaw,
        voltage,
        percentage,
        gpsCount,
        hpop
      })
    })

    return {
      droneSource
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
    width: 250px;
    z-index: 1;
    list-style:none;
    text-align: left;
    @media screen and (max-width: 992px) {
      width: 200px;
      height: 100px;
    }
  }
</style>
