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
          2
        </div>
      </div>
      <div
        id="camera"
        class="tab-pane fade"
      >
        <div class="tab-container">
          3
        </div>
      </div>
      <div
        id="log"
        class="tab-pane fade"
      >
        <div class="tab-container">
          4
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowsAltV, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
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

    /**
     * Listen change events from components
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
      tachometerAlt
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
      }
    }
  }
</style>
