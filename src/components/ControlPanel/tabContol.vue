<template>
  <div
    id="control"
    class="tab-pane fade show active"
  >
    <div class="tab-container">
      <div class="row g-0 p-2">
        <div class="col-6">
          <SwitchArm />
        </div>

        <div class="col-6">
          <SwitchTakeoff />
        </div>

        <div class="col-4">
          <InputAltitude />
        </div>

        <div class="col-4">
          <InputSpeed />
        </div>

        <div class="col-4">
          <InputYaw />
        </div>

        <div class="col-12">
          <!-- Flight mode -->
          <ButtonFlightMode />
        </div>

        <div class="col-12">
          <!-- Target GPS coordinates -->
          <InputTargetGps />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwitchArm from '@/components/ControlPanel/components/SwitchArm.vue'
import SwitchTakeoff from '@/components/ControlPanel/components/SwitchTakeoff.vue'
import InputAltitude from '@/components/ControlPanel/components/InputAltitude.vue'
import InputSpeed from '@/components/ControlPanel/components/InputSpeed.vue'
import InputYaw from '@/components/ControlPanel/components/InputYaw.vue'
import ButtonFlightMode from '@/components/ControlPanel/components/ButtonFlightMode.vue'
import InputTargetGps from '@/components/ControlPanel/components/InputTargetGps.vue'
export default {
  name: 'TabControl',
  components: {
    SwitchArm,
    SwitchTakeoff,
    InputAltitude,
    InputSpeed,
    InputYaw,
    ButtonFlightMode,
    InputTargetGps
  },
  setup () {
  }
}
</script>

<style lang="scss" scoped>
.tab-pane{
  height: 100%;
  >.tab-container{
    height: 100%;
    >div {
      height: 100%;
    }
  }
}
</style>
