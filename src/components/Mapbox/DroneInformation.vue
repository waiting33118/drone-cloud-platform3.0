<template>
  <div class="info-wrapper">
    <div class="info-wrapper__child">
      <div class="component time">
        <span class="title">TIME</span>
        <span>{{ info.timestamp }}</span>
      </div>
      <div class="component coords">
        <span class="title">GPS</span>
        <span>{{ `${info.longitude},${info.latitude}` }}</span>
      </div>
      <div class="component device">
        <span class="title">DEVICE</span>
        <span>{{ info.deviceId }}</span>
      </div>
      <div class="component heading">
        <span class="title">HEADING</span>
        <span>{{ info.heading }}</span>
      </div>
      <div class="component altitude">
        <span class="title">ALTITUDE(m)</span>
        <span>{{ info.relativeAltitude }}</span>
      </div>
      <div class="component speed">
        <span class="title">SPEED(m/s)</span>
        <span>{{ info.airSpeed }}</span>
      </div>
      <div class="component props">
        <span class="title">PROPS</span>
        <span>{{ `${info.isArm ? 'ARM' : 'DISARM'}` }}</span>
      </div>
      <div class="component mode">
        <span class="title">MODE</span>
        <span>{{ info.flightMode }}</span>
      </div>
      <div class="component voltage">
        <span class="title">VOLTAGE</span>
        <span>{{ info.voltage }}</span>
      </div>
      <div class="component pitch">
        <span class="title">PITCH</span>
        <span>{{ info.pitch }}</span>
      </div>
      <div class="component roll">
        <span class="title">ROLL</span>
        <span>{{ info.roll }}</span>
      </div>
      <div class="component yaw">
        <span class="title">YAW</span>
        <span>{{ info.yaw }}</span>
      </div>
      <div class="component battery">
        <span class="title">BATTERY</span>
        <span>{{ info.percentage }}</span>
      </div>
      <div class="component count">
        <span class="title">GPS COUNTS</span>
        <span>{{ info.gpsCount }}</span>
      </div>
      <div class="component hpop">
        <span class="title">GPS HPOP</span>
        <span>{{ info.hpop }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
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
  .info-wrapper {
    /* default reset */
    padding: 0;
    margin: 0;
    z-index: 50;

    /* sizing */
    height: 120px;
    width: calc(100% - 110px);
    border-radius: 5px;

    /* position */
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);

    /* decoration */
    backdrop-filter: blur(8px);
    box-shadow: 0px 0px 3px 2px rgba(0,0,0,0.45);

    >.info-wrapper__child {
      width: 100%;
      height: 100%;

      /* layout */
      display: grid;
      gap: 1px;
      grid-template-columns: repeat(6,1fr);
      grid-template-rows: repeat(5, 1fr);
      overflow-y: auto;
      @media screen and (min-width:1000px) {
        grid-template-rows: repeat(3, 1fr);
        overflow-y: hidden;
      }

      >.component {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;

        >.title {
          color: rgb(0, 132, 255);
          font-weight: 600;
          width: 100%;
          height: 50%;
          text-align: center;
          font-size: 14px;
        }
        &.time {
          grid-area: 1 / 1 / 2 / 3;
          @media screen and (min-width:1000px) {
            grid-area: 1 / 1 / 2 / 3;
          }
        }
        &.coords {
          grid-area: 1 / 3 / 2 / 5;
          @media screen and (min-width:1000px) {
            grid-area: 1 / 3 / 2 / 5;
          }
        }
        &.device {
          grid-area: 1 / 5 / 2 / 7;
          @media screen and (min-width:1000px) {
            grid-area: 1 / 5 / 2 / 7;
          }
        }

        &.heading {
          grid-area: 2 / 1 / 3 / 3;
          @media screen and (min-width:1000px) {
            grid-area: 2 / 1 / 3 / 2;
          }
        }
        &.altitude {
          grid-area: 2 / 3 / 3 / 5;
          @media screen and (min-width:1000px) {
            grid-area: 2 / 2 / 3 / 3;
          }
        }
        &.speed {
          grid-area: 2 / 5 / 3 / 7;
          @media screen and (min-width:1000px) {
            grid-area: 2 / 3 / 3 / 4;
          }
        }

        &.props{
          grid-area: 3 / 1 / 4 / 3;
          @media screen and (min-width:1000px) {
            grid-area: 2 / 4 / 3 / 5;
          }
        }
        &.mode{
          grid-area: 3 / 3 / 4 / 5;
          @media screen and (min-width:1000px) {
            grid-area: 2 / 5 / 3 / 6;
          }
        }
        &.voltage{
          grid-area: 3 / 5 / 4 / 7;
          @media screen and (min-width:1000px) {
            grid-area: 2 / 6 / 3 / 7;
          }
        }

        &.roll{
          grid-area: 4 / 1 / 5 / 3;
          @media screen and (min-width:1000px) {
            grid-area: 3 / 1 / 4 / 2;
          }
        }
        &.yaw{
          grid-area: 4 / 3 / 5 / 5;
          @media screen and (min-width:1000px) {
            grid-area: 3 / 2 / 4 / 3
          }
        }
        &.pitch{
          grid-area: 4 / 5 / 5 / 7;
          @media screen and (min-width:1000px) {
            grid-area: 3 / 3 / 4 / 4;
          }
        }

        &.battery{
          grid-area: 5 / 1 / 6 / 3;
          @media screen and (min-width:1000px) {
            grid-area: 3 / 4 / 4 / 5;
          }
        }
        &.count{
          grid-area: 5 / 3 / 6 / 5;
          @media screen and (min-width:1000px) {
            grid-area: 3 / 5 / 4 / 6;
          }
        }
        &.hpop{
          grid-area: 5 / 5 / 6 / 7;
          @media screen and (min-width:1000px) {
            grid-area: 3 / 6 / 4 / 7;
          }
        }
      }
    }
  }
</style>
