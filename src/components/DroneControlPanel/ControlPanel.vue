<template>
  <div>
    <ul
      id="myTab"
      class="nav nav-tabs"
    >
      <li class="nav-item">
        <a
          id="home-tab"
          class="nav-link active"
          href="#control"
          data-bs-toggle="tab"
        >Control</a>
      </li>
      <li class="nav-item">
        <a
          id="profile-tab"
          class="nav-link"
          href="#servo"
          data-bs-toggle="tab"
        >Servo</a>
      </li>
      <li class="nav-item">
        <a
          id="contact-tab"
          class="nav-link"
          href="#camera"
          data-bs-toggle="tab"
        >Camera</a>
      </li>
      <li class="nav-item">
        <a
          id="contact-tab"
          class="nav-link"
          href="#log"
          data-bs-toggle="tab"
        >Log</a>
      </li>
    </ul>
    <div
      id="myTabContent"
      class="tab-content"
    >
      <!-- Tab Containers -->
      <TabControl />
      <TabServo />
      <TabCamera />
      <TabLog />
    </div>
  </div>
</template>

<script>
import TabControl from '@/components/ControlPanel/tabContol.vue'
import TabServo from '@/components/ControlPanel/tabServo.vue'
import TabCamera from '@/components/ControlPanel/tabCamera.vue'
import TabLog from '@/components/ControlPanel/tabLog.vue'
export default {
  name: 'ControlPanel',
  components: {
    TabControl,
    TabServo,
    TabCamera,
    TabLog
  },
  setup () {
    /**
     * All controlpanel button status
     */
    // const allButtonStatus = reactive({
    //   isArm: false,
    //   isTakeoff: false,
    //   altitudeValue: 3,
    //   speedValue: 3,
    //   yawValue: 0,
    //   gimbalYValue: 1500,
    //   gimbalXValue: 1500
    // })
    // const SERVO_MODE = {
    //   UP: 'SERVO_UP',
    //   DOWN: 'SERVO_DOWN',
    //   STOP: 'SERVO_STOP'
    // }
    // const GIMBAL_ACTION = {
    //   X_AXIS: 'GIMBAL_LEFT_RIGHT',
    //   Y_AXIS: 'GIMBAL_FRONT_BACK'
    // }
    /**
     * FontAwesome implementation
     */

    /*
      1. Listen change events from child components
      2. Emits API command
     */
    // const armStatus = value => {
    //   allButtonStatus.isArm = value
    //   if (value) return drone.arm()
    //   drone.disarm()
    // }
    // const takeoffStatus = value => {
    //   allButtonStatus.isTakeoff = value
    //   if (value) return drone.takeOff(allButtonStatus.altitudeValue)
    //   drone.land()
    // }
    // const altitudeValue = () => {
    //   emit('altitudeEmit', allButtonStatus.altitudeValue)
    //   props.droneTargetgps.lng === undefined && props.droneTargetgps.lat === undefined
    //     ? alert({ title: 'Please set a target first!' })
    //     : drone.goto(props.droneTargetgps.lng, props.droneTargetgps.lat, allButtonStatus.altitudeValue)
    // }
    // const speedValue = value => {
    //   allButtonStatus.speedValue = value
    //   drone.changeSpeed(allButtonStatus.speedValue)
    // }
    // const yawValue = value => {
    //   allButtonStatus.yawValue = value
    //   drone.changeYaw(allButtonStatus.yawValue)
    // }
    // const gimbalYValue = value => {
    //   allButtonStatus.gimbalYValue = value
    //   drone.gimbalControl(GIMBAL_ACTION.Y_AXIS, allButtonStatus.gimbalYValue)
    // }
    // const gimbalXValue = value => {
    //   allButtonStatus.gimbalXValue = value
    //   drone.gimbalControl(GIMBAL_ACTION.X_AXIS, allButtonStatus.gimbalXValue)
    // }
    // const handleServoUp = () => drone.servoControl(SERVO_MODE.UP)
    // const handleServoDown = () => drone.servoControl(SERVO_MODE.DOWN)
    // const handleServoStop = () => drone.servoControl(SERVO_MODE.STOP)

    // watch(() => props.droneInfo, newProps => {
    //   const {
    //     heartbeat: {
    //       is_armed: isArmed,
    //       flight_mode: flightMode
    //     },
    //     location: {
    //       relative_alt: relativeAlt,
    //       heading
    //     }
    //   } = newProps
    //   // Reload status if web page reload
    //   isArmed === '0' ? allButtonStatus.isArm = false : allButtonStatus.isArm = true
    //   if (flightMode !== 'LAND' && isArmed === '1' && relativeAlt > '1') {
    //     allButtonStatus.isTakeoff = true
    //   } else {
    //     allButtonStatus.isTakeoff = false
    //   }
    //   allButtonStatus.yawValue = Number(heading).toFixed(0)
    //   // When drone is disarm, auto switch land or rtl mode to guided
    //   if ((flightMode === 'LAND' || flightMode === 'RTL') && isArmed === '0') drone.changeFlightMode('GUIDED')
    // })

  }
}
</script>

<style lang="scss" scoped>
  #myTab{
    height: 43px;
    >li >.active{
      background-color: #048eff;
      color: white;
    }
  }
  #myTabContent{
    height: calc((100vh - 58px) / 2 - 43px); // 58px => navbar; 43px => tab
  }
</style>
