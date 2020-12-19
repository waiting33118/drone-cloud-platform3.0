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
            <div class="col border">
              <SwitchButton @handleButtonEmit="armStatus">
                {{ allButtonStatus.isArm ? 'Arm': 'Disarm' }}
              </SwitchButton>
            </div>
            <!-- Takeoff / Land -->
            <div class="col-6 border">
              <SwitchButton @handleButtonEmit="takeoffStatus">
                {{ allButtonStatus.isTakeoff ? 'Land' : 'Takeoff' }}
              </SwitchButton>
            </div>
            <!-- Altitude -->
            <div class="col-6 border">
              <Range>
                Altitude (m)
              </Range>
            </div>
            <!-- Speed -->
            <div class="col-6 border">
              <Range>
                Speed (m/s)
              </Range>
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
import SwitchButton from '@/components/ControlPanel/SwitchButton.vue'
import Range from '@/components/ControlPanel/Range.vue'
import { reactive } from 'vue'
export default {
  name: 'ControlPanel',
  components: {
    SwitchButton,
    Range
  },
  setup () {
    const allButtonStatus = reactive({
      isArm: false,
      isTakeoff: false
    })
    const armStatus = (value) => { allButtonStatus.isArm = value }
    const takeoffStatus = (value) => { allButtonStatus.isTakeoff = value }
    return {
      armStatus,
      takeoffStatus,
      allButtonStatus
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
