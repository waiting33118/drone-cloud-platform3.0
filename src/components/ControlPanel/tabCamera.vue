<template>
  <div
    id="camera"
    class="tab-pane fade"
  >
    <div class="tab-container">
      <div class="d-flex flex-column justify-content-center p-2">
        <InputRange>
          <FontAwesomeIcon :icon="video" />
          Gimbal Front & Back
        </InputRange>

        <InputRange>
          <FontAwesomeIcon :icon="video" />
          Gimbal Left & Right
        </InputRange>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import InputRange from '@/components/ControlPanel/components/InputRange.vue'
import { computed } from 'vue'
export default {
  name: 'TabCamera',
  components: {
    FontAwesomeIcon,
    InputRange
  },
  setup () {
    const video = computed(() => faVideo)

    return {
      video
    }
  }
}
</script>
