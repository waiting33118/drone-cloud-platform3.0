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
              <SwitchButton @handleButtonEmit="armStatus">
                {{ allButtonStatus.isArm ? 'Arm': 'Disarm' }}
              </SwitchButton>
            </div>
            <!-- Takeoff / Land -->
            <div class="col-6 py-1 border">
              <SwitchButton @handleButtonEmit="takeoffStatus">
                {{ allButtonStatus.isTakeoff ? 'Land' : 'Takeoff' }}
              </SwitchButton>
            </div>
            <!-- Altitude -->
            <div class="col-6 py-1 border">
              <Range @handleRangeEmit="altitudeValue">
                <FontAwesomeIcon
                  class="me-1"
                  :icon="arrowV"
                />Altitude (m)
              </Range>
            </div>
            <!-- Speed -->
            <div class="col-6 py-1 border">
              <Range @handleRangeEmit="speedValue">
                <FontAwesomeIcon
                  class="me-1"
                  :icon="tachometerAlt"
                />Speed (m/s)
              </Range>
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
            <button class="btn btn-primary">
              SERVO UP<FontAwesomeIcon
                class="ms-2 fs-2"
                :icon="box"
              />
              <FontAwesomeIcon
                :icon="arrowUp"
                class="ms-2 fs-2"
              />
            </button>
            <!-- servo down -->
            <button class="btn btn-primary">
              SERVO DOWN<FontAwesomeIcon
                class="ms-2 fs-2"
                :icon="box"
              />
              <FontAwesomeIcon
                :icon="arrowDown"
                class="ms-2 fs-2"
              />
            </button>
            <button class="btn btn-primary bg-danger">
              <!-- servo stop -->
              SERVO STOP<FontAwesomeIcon
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
        <div class="tab-container d-flex justify-content-center align-items-center">
          <div class="position-relative h-50 w-50">
            <div class="position-absolute top-0 start-50 translate-middle-x">
              <button class="btn btn-success rounded-pill px-3">
                UP
              </button>
            </div>
            <div class="position-absolute top-50 start-0 translate-middle-y">
              <button class="btn btn-success rounded-pill px-3">
                LEFT
              </button>
            </div>
            <div class="position-absolute top-50 end-0 translate-middle-y">
              <button class="btn btn-success rounded-pill px-3">
                RIGHT
              </button>
            </div>
            <div class="position-absolute bottom-0 start-50 translate-middle-x">
              <button class="btn btn-success rounded-pill px-3">
                DOWN
              </button>
            </div>
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
              v-for="i in 100"
              :key="i"
            >
              {{ `${i} - test` }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowsAltV, faTachometerAlt, faBox, faStopCircle, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import SwitchButton from '@/components/ControlPanel/SwitchButton.vue'
import Range from '@/components/ControlPanel/Range.vue'
import Form from '@/components/ControlPanel/Form.vue'
import { computed, reactive } from 'vue'
export default {
  name: 'ControlPanel',
  components: {
    FontAwesomeIcon,
    SwitchButton,
    Range,
    Form
  },
  setup () {
    /**
     * All controlpanel button status
     */
    const allButtonStatus = reactive({
      isArm: false,
      isTakeoff: false,
      altitudeValue: 0,
      speedValue: 0
    })

    /**
     * FontAwesome implementation
     */
    const arrowV = computed(() => faArrowsAltV)
    const tachometerAlt = computed(() => faTachometerAlt)
    const box = computed(() => faBox)
    const stopCircle = computed(() => faStopCircle)
    const arrowUp = computed(() => faArrowUp)
    const arrowDown = computed(() => faArrowDown)
    /**
     * Listen change events from child components
     */
    const armStatus = (value) => { allButtonStatus.isArm = value }
    const takeoffStatus = (value) => { allButtonStatus.isTakeoff = value }
    const altitudeValue = (value) => { allButtonStatus.altitudeValue = value }
    const speedValue = (value) => { allButtonStatus.speedValue = value }

    return {
      armStatus,
      takeoffStatus,
      altitudeValue,
      speedValue,
      allButtonStatus,
      arrowV,
      tachometerAlt,
      box,
      stopCircle,
      arrowUp,
      arrowDown
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
