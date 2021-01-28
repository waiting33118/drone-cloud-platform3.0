<template>
  <div
    id="servo"
    class="tab-pane fade"
  >
    <div class="tab-container">
      <div class="d-flex flex-column justify-content-evenly p-2">
        <button
          class="btn btn-primary p-4 mb-2 fs-5"
          @click="handleServo('UP')"
        >
          SERVO UP
          <FontAwesomeIcon :icon="box" />
          <FontAwesomeIcon :icon="arrowUp" />
        </button>

        <button
          class="btn btn-primary p-4 mb-2 fs-5"
          @click="handleServo('DOWN')"
        >
          SERVO DOWN
          <FontAwesomeIcon :icon="box" />
          <FontAwesomeIcon :icon="arrowDown" />
        </button>

        <button
          class="btn btn-primary bg-danger p-4 mb-2 fs-5"
          @click="handleServo('STOP')"
        >
          SERVO STOP
          <FontAwesomeIcon :icon="stop" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { servoControl } from '../../api'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBox, faArrowUp, faArrowDown, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import { computed } from 'vue'
export default {
  name: 'TabServo',
  components: {
    FontAwesomeIcon
  },
  setup () {
    const SERVO_ACTION = {
      UP: 'SERVO_UP',
      DOWN: 'SERVO_DOWN',
      STOP: 'SERVO_STOP'
    }
    const box = computed(() => faBox)
    const arrowUp = computed(() => faArrowUp)
    const arrowDown = computed(() => faArrowDown)
    const stop = computed(() => faStopCircle)

    const handleServo = (action) => {
      if (action === 'UP') servoControl(SERVO_ACTION.UP)
      if (action === 'DOWN') servoControl(SERVO_ACTION.DOWN)
      if (action === 'STOP') servoControl(SERVO_ACTION.STOP)
    }

    return {
      box,
      arrowUp,
      arrowDown,
      stop,
      handleServo
    }
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
