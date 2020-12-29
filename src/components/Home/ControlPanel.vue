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
      <div
        id="control"
        class="tab-pane fade show active"
      >
        <div class="tab-container">
          <div class="row p-3 gy-2">
            <!-- Arm / Disarm-->
            <div class="col py-1 border">
              <SwitchButton
                :button-status="allButtonStatus.isArm"
                @handleButtonEmit="armStatus"
              >
                {{ allButtonStatus.isArm ? 'Arm': 'Disarm' }}
              </SwitchButton>
            </div>
            <!-- Takeoff / Land -->
            <div class="col-6 py-1 border">
              <SwitchButton
                :button-status="allButtonStatus.isTakeoff"
                @handleButtonEmit="takeoffStatus"
              >
                {{ allButtonStatus.isTakeoff ? 'Land' : 'Takeoff' }}
              </SwitchButton>
            </div>
            <!-- Altitude -->
            <div class="col-4 py-1 border">
              <Range
                :min="1"
                :max="100"
                :step="0.5"
                :range-status="Number(allButtonStatus.altitudeValue)"
                @handleRangeEmit="altitudeValue"
              >
                <FontAwesomeIcon
                  class="me-1"
                  :icon="arrowV"
                />Altitude (m)
              </Range>
            </div>
            <!-- Speed -->
            <div class="col-4 py-1 border">
              <Range
                :min="1"
                :max="14"
                :step="0.5"
                :range-status="Number(allButtonStatus.speedValue)"
                @handleRangeEmit="speedValue"
              >
                <FontAwesomeIcon
                  class="me-1"
                  :icon="tachometerAlt"
                />Speed (m/s)
              </Range>
            </div>
            <!-- Yaw -->
            <div class="col-4 py-1 border">
              <Range
                :min="0"
                :max="359"
                :step="1"
                :range-status="Number(allButtonStatus.yawValue)"
                @handleRangeEmit="yawValue"
              >
                <FontAwesomeIcon
                  class="me-1"
                  :icon="locationArrow"
                />Yaw (Angle)
              </Range>
            </div>
            <!-- Flight Mode -->
            <div class="col-12 py-1 border">
              <ButtonGroup />
            </div>
            <div class="col-12 py-1 border">
              <Form :target-gps="targetGps" />
            </div>
          </div>
        </div>
      </div>
      <div
        id="servo"
        class="tab-pane fade"
      >
        <div class="tab-container">
          <div class="d-grid gap-2 p-4 h-100">
            <!-- servo up -->
            <button
              class="btn btn-primary"
              @click="handleServoUp"
            >
              SERVO UP
              <FontAwesomeIcon
                class="ms-2 fs-2"
                :icon="box"
              />
              <FontAwesomeIcon
                :icon="arrowUp"
                class="ms-2 fs-2"
              />
            </button>
            <!-- servo down -->
            <button
              class="btn btn-primary"
              @click="handleServoDown"
            >
              SERVO DOWN
              <FontAwesomeIcon
                class="ms-2 fs-2"
                :icon="box"
              />
              <FontAwesomeIcon
                :icon="arrowDown"
                class="ms-2 fs-2"
              />
            </button>
            <button
              class="btn btn-primary bg-danger"
              @click="handleServoStop"
            >
              <!-- servo stop -->
              SERVO STOP
              <FontAwesomeIcon
                :icon="stopCircle"
                class="ms-2 fs-2"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        id="camera"
        class="tab-pane fade"
      >
        <div class="row p-3 gy-2 h-100">
          <!-- GIMBAL_FRONT_BACK -->
          <div class="col-12 d-flex flex-column justify-content-evenly border">
            <Range
              :min="1200"
              :max="1800"
              :step="1"
              :range-status="Number(allButtonStatus.gimbalYValue)"
              @handleRangeEmit="gimbalYValue"
            >
              <FontAwesomeIcon
                class="me-1"
                :icon="video"
              />Gimbal Front & Back
            </Range>
          </div>
          <!-- GIMBAL_LEFT_RIGHT -->
          <div class="col-12 d-flex flex-column justify-content-evenly border">
            <Range
              :min="1200"
              :max="1800"
              :step="1"
              :range-status="Number(allButtonStatus.gimbalXValue)"
              @handleRangeEmit="gimbalXValue"
            >
              <FontAwesomeIcon
                class="me-1"
                :icon="video"
              />Gimbal Left & Right
            </Range>
          </div>
        </div>
      </div>
      <div
        id="log"
        class="tab-pane fade"
      >
        <div class="tab-container">
          <!-- log -->
          <ul class="log-container">
            <li
              v-for="log in logs"
              :key="log"
            >
              {{ log }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowsAltV, faTachometerAlt, faBox, faStopCircle, faArrowUp, faArrowDown, faLocationArrow, faVideo } from '@fortawesome/free-solid-svg-icons'
import SwitchButton from '@/components/ControlPanel/SwitchButton.vue'
import Range from '@/components/ControlPanel/Range.vue'
import Form from '@/components/ControlPanel/Form.vue'
import ButtonGroup from '@/components/ControlPanel/ButtonGroup.vue'
import drone from '../../services/drone'
import { computed, reactive, watch } from 'vue'
import { alert } from '../../utils/sweetAlert'
export default {
  name: 'ControlPanel',
  components: {
    FontAwesomeIcon,
    SwitchButton,
    Range,
    Form,
    ButtonGroup
  },
  props: {
    droneInfo: {
      type: Object,
      default: () => ({})
    },
    droneApm: {
      type: Array,
      default: () => []
    },
    droneTargetgps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['altitudeEmit'],
  setup (props, { emit }) {
    /**
     * All controlpanel button status
     */
    const allButtonStatus = reactive({
      isArm: false,
      isTakeoff: false,
      altitudeValue: 3,
      speedValue: 3,
      yawValue: 0,
      gimbalYValue: 1500,
      gimbalXValue: 1500
    })
    const SERVO_MODE = {
      UP: 'SERVO_UP',
      DOWN: 'SERVO_DOWN',
      STOP: 'SERVO_STOP'
    }
    const GIMBAL_ACTION = {
      X_AXIS: 'GIMBAL_LEFT_RIGHT',
      Y_AXIS: 'GIMBAL_FRONT_BACK'
    }
    /**
     * FontAwesome implementation
     */
    const arrowV = computed(() => faArrowsAltV)
    const tachometerAlt = computed(() => faTachometerAlt)
    const box = computed(() => faBox)
    const stopCircle = computed(() => faStopCircle)
    const arrowUp = computed(() => faArrowUp)
    const arrowDown = computed(() => faArrowDown)
    const locationArrow = computed(() => faLocationArrow)
    const video = computed(() => faVideo)

    // APM_Logs
    const logs = computed(() => props.droneApm)
    // Target GPS
    const targetGps = computed(() => props.droneTargetgps)

    /*
      1. Listen change events from child components
      2. Emits API command
     */
    const armStatus = value => {
      allButtonStatus.isArm = value
      if (value) return drone.arm()
      drone.disarm()
    }
    const takeoffStatus = value => {
      allButtonStatus.isTakeoff = value
      if (value) return drone.takeOff(allButtonStatus.altitudeValue)
      drone.land()
    }
    const altitudeValue = value => {
      allButtonStatus.altitudeValue = value
      emit('altitudeEmit', allButtonStatus.altitudeValue)
      props.droneTargetgps.lng === undefined && props.droneTargetgps.lat === undefined
        ? alert({ title: 'Please set a target first!' })
        : drone.goto(props.droneTargetgps.lng, props.droneTargetgps.lat, allButtonStatus.altitudeValue)
    }
    const speedValue = value => {
      allButtonStatus.speedValue = value
      drone.changeSpeed(allButtonStatus.speedValue)
    }
    const yawValue = value => {
      allButtonStatus.yawValue = value
      drone.changeYaw(allButtonStatus.yawValue)
    }
    const gimbalYValue = value => {
      allButtonStatus.gimbalYValue = value
      drone.gimbalControl(GIMBAL_ACTION.Y_AXIS, allButtonStatus.gimbalYValue)
    }
    const gimbalXValue = value => {
      allButtonStatus.gimbalXValue = value
      drone.gimbalControl(GIMBAL_ACTION.X_AXIS, allButtonStatus.gimbalXValue)
    }
    const handleServoUp = () => drone.servoControl(SERVO_MODE.UP)
    const handleServoDown = () => drone.servoControl(SERVO_MODE.DOWN)
    const handleServoStop = () => drone.servoControl(SERVO_MODE.STOP)

    watch(() => props.droneInfo, newProps => {
      const {
        heartbeat: {
          is_armed: isArmed,
          flight_mode: flightMode
        },
        location: {
          relative_alt: relativeAlt,
          heading
        }
      } = newProps
      // Reload status if web page reload
      isArmed === '0' ? allButtonStatus.isArm = false : allButtonStatus.isArm = true
      if (flightMode !== 'LAND' && isArmed === '1' && relativeAlt > '1') {
        allButtonStatus.isTakeoff = true
      } else {
        allButtonStatus.isTakeoff = false
      }
      allButtonStatus.yawValue = Number(heading).toFixed(0)
      // When drone is disarm, auto switch land or rtl mode to guided
      if ((flightMode === 'LAND' || flightMode === 'RTL') && isArmed === '0') drone.changeFlightMode('GUIDED')
    })

    return {
      allButtonStatus,
      altitudeValue,
      armStatus,
      arrowDown,
      arrowUp,
      arrowV,
      box,
      gimbalXValue,
      gimbalYValue,
      handleServoDown,
      handleServoStop,
      handleServoUp,
      locationArrow,
      logs,
      speedValue,
      stopCircle,
      tachometerAlt,
      takeoffStatus,
      video,
      yawValue,
      targetGps
    }
  }
}
</script>

<style lang="scss" scoped>
  #myTab{
    height: 43px;
    >li >.active{
      background-color: gray;
      color: white;
    }
  }
  #myTabContent{
    height: calc((100vh - 58px) / 2 - 43px); // 58px = navbar; 43px = tab
    >.tab-pane{
      height: 100%;
      >.tab-container{
        height: 100%;
        >.log-container{
        height: 100%;
        overflow-y: auto;
        margin-bottom: 0;
      }
      }
    }
  }
</style>
