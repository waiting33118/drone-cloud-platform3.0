<template>
  <div
    id="servo"
    class="tab-pane fade"
  >
    <div class="tab-container">
      <div class="d-flex flex-column justify-content-center p-2">
        <button class="btn btn-primary p-4 mb-2 fs-5">
          SERVO UP
          <FontAwesomeIcon :icon="box" />
          <FontAwesomeIcon :icon="arrowUp" />
        </button>

        <button class="btn btn-primary p-4 mb-2 fs-5">
          SERVO DOWN
          <FontAwesomeIcon :icon="box" />
          <FontAwesomeIcon :icon="arrowDown" />
        </button>

        <button class="btn btn-primary bg-danger p-4 mb-2 fs-5">
          SERVO STOP
          <FontAwesomeIcon :icon="stop" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBox, faArrowUp, faArrowDown, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
export default {
  name: 'TabServo',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const box = computed(() => faBox)
    const arrowUp = computed(() => faArrowUp)
    const arrowDown = computed(() => faArrowDown)
    const stop = computed(() => faStopCircle)

    return {
      box,
      arrowUp,
      arrowDown,
      stop
    }
  }
}
</script>
