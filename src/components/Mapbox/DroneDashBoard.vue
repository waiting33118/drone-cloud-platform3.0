<template>
  <ul class="info__wrapper">
    <li><span>TIME</span>{{ drone.timeStamp }}</li>
    <li><span>GPS</span>{{ drone.longitude }} {{ drone.latitude }}</li>
    <li><span>DEVICE</span>{{ user.droneId }}</li>
    <li><span>HEADING</span>{{ drone.heading }}</li>
    <li><span>ALTITUDE(m)</span>{{ drone.altitude }}</li>
    <li><span>SPEED(m/s)</span>{{ drone.speed }}</li>
    <li><span>STATUS</span>{{ drone.isArmed }}</li>
    <li><span>MODE</span>{{ drone.mode }}</li>
    <li><span>VOLTAGE</span>{{ drone.voltage }}</li>
    <li><span>BATTERY</span>{{ drone.percentage }}</li>
    <li><span>ROLL</span>{{ drone.roll }}</li>
    <li><span>YAW</span>{{ drone.yaw }}</li>
    <li><span>GPS COUNTS</span>{{ drone.gpsCount }}</li>
    <li><span>GPS HPOP</span>{{ drone.hpop }}</li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'DroneDashBoard',
  setup() {
    const store = useStore()
    const drone = computed(() => store.getters['drone/getDroneInfo'])
    const user = computed(() => store.getters.getUserInfo)
    return {
      drone,
      user
    }
  }
}
</script>

<style lang="scss" scoped>
.info__wrapper {
  width: 200px;
  height: 100px;
  overflow-y: auto;
  top: 0.5rem;
  left: 0.5rem;
  position: absolute;
  z-index: 150;
  padding: 0.5rem;
  list-style: none;
  font-size: 1px;
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 10px;
  color: #ff0000;

  @media (min-width: 800px) {
    height: auto;
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  span {
    color: blue;
    font-weight: 600;
    margin-right: 5px;
  }
}
</style>
