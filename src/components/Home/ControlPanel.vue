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
              <Form />
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
          <div class="col-12 border">
            1
          </div>
          <!-- GIMBAL_LEFT_RIGHT -->
          <div class="col-12 border">
            2
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
import { faArrowsAltV, faTachometerAlt, faBox, faStopCircle, faArrowUp, faArrowDown, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import SwitchButton from '@/components/ControlPanel/SwitchButton.vue'
import Range from '@/components/ControlPanel/Range.vue'
import Form from '@/components/ControlPanel/Form.vue'
import ButtonGroup from '@/components/ControlPanel/ButtonGroup.vue'
import drone from '../../services/drone'
import { computed, reactive, watch } from 'vue'
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
    }
  },
  setup (props) {
    /**
     * All controlpanel button status
     */
    const allButtonStatus = reactive({
      isArm: false,
      isTakeoff: false,
      altitudeValue: 3,
      speedValue: 3,
      yawValue: 0
    })
    const SERVO_MODE = {
      UP: 'SERVO_UP',
      DOWN: 'SERVO_DOWN',
      STOP: 'SERVO_STOP'
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
    /**
     * APM_Logs
     */
    const logs = computed(() => props.droneApm)

    /*
      1. Listen change events from child components
      2. Emits API command
     */
    const armStatus = (value) => {
      allButtonStatus.isArm = value
      if (value) return drone.arm()
      drone.disarm()
    }
    const takeoffStatus = (value) => {
      allButtonStatus.isTakeoff = value
      if (value) return drone.takeOff(allButtonStatus.altitudeValue)
      drone.land()
    }
    const altitudeValue = (value) => {
      allButtonStatus.altitudeValue = value
      // TODO: Is there no gps coordinates, abort goto cmd
      drone.goto(121.534919, 25.042853, allButtonStatus.altitudeValue)
    }
    const speedValue = (value) => {
      allButtonStatus.speedValue = value
      drone.changeSpeed(allButtonStatus.speedValue)
    }
    const yawValue = (value) => {
      allButtonStatus.yawValue = value
      drone.changeYaw(allButtonStatus.yawValue)
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
      if (flightMode !== 'LAND' && isArmed === '1' && relativeAlt > '1') allButtonStatus.isTakeoff = true
      allButtonStatus.yawValue = Number(heading).toFixed(0)
      // When drone is disarm, auto switch land or rtl mode to guided
      if ((flightMode === 'LAND' || flightMode === 'RTL') && isArmed === '0') drone.changeFlightMode('GUIDED')
    })

    return {
      armStatus,
      takeoffStatus,
      altitudeValue,
      speedValue,
      yawValue,
      allButtonStatus,
      arrowV,
      tachometerAlt,
      box,
      stopCircle,
      arrowUp,
      arrowDown,
      locationArrow,
      logs,
      handleServoUp,
      handleServoDown,
      handleServoStop
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
        overflow-y: scroll;
        margin-bottom: 0;
      }
      }
    }
  }
</style>
