<template>
  <div
    id="control"
    class="tab-pane fade show active"
  >
    <div class="tab-container">
      <div class="row g-0 p-2">
        <div class="col-6">
          <Switch>Arm</Switch>
        </div>

        <div class="col-6">
          <Switch>Land</Switch>
        </div>

        <div class="col-4">
          <InputNumber>
            <FontAwesomeIcon :icon="arrowsV" />
            Altitude
          </InputNumber>
        </div>

        <div class="col-4">
          <InputRange>
            <FontAwesomeIcon :icon="tachometerAlt" />
            Speed(m/s)
          </InputRange>
        </div>

        <div class="col-4">
          <InputRange>
            <FontAwesomeIcon :icon="locationArrow" />
            Yaw (Angle)
          </InputRange>
        </div>

        <div class="col-12">
          <!-- Flight mode -->
          <ButtonGroups />
        </div>

        <div class="col-12">
          <!-- Target GPS coordinates -->
          <InputGroups />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Switch from '@/components/ControlPanel/components/Switch.vue'
import InputNumber from '@/components/ControlPanel/components/InputNumber.vue'
import InputRange from '@/components/ControlPanel/components/InputRange.vue'
import ButtonGroups from '@/components/ControlPanel/components/ButtonGroups.vue'
import InputGroups from '@/components/ControlPanel/components/InputGroups.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowsAltV, faTachometerAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
export default {
  name: 'TabControl',
  components: {
    FontAwesomeIcon,
    Switch,
    InputNumber,
    InputRange,
    ButtonGroups,
    InputGroups
  },
  setup () {
    const arrowsV = computed(() => faArrowsAltV)
    const tachometerAlt = computed(() => faTachometerAlt)
    const locationArrow = computed(() => faLocationArrow)

    return {
      arrowsV,
      tachometerAlt,
      locationArrow
    }
  }
}
</script>
