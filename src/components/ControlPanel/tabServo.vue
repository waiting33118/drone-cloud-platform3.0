<template>
  <div class="btn-wrapper">
    <el-tooltip
      class="item"
      effect="dark"
      content="Servo Up"
      placement="top"
    >
      <el-button
        type="primary"
        circle
        class="btn-servo"
        @click="handleServo('UP')"
      >
        <FontAwesomeIcon :icon="box" />
        <FontAwesomeIcon :icon="arrowUp" />
      </el-button>
    </el-tooltip>

    <el-tooltip
      class="item"
      effect="dark"
      content="Servo Down"
      placement="top"
    >
      <el-button
        type="primary"
        circle
        class="btn-servo"
        @click="handleServo('DOWN')"
      >
        <FontAwesomeIcon :icon="box" />
        <FontAwesomeIcon :icon="arrowDown" />
      </el-button>
    </el-tooltip>

    <el-tooltip
      class="item"
      effect="dark"
      content="Servo Stop"
      placement="top"
    >
      <el-button
        type="danger"
        circle
        class="btn-servo"
        @click="handleServo('STOP')"
      >
        <FontAwesomeIcon :icon="box" />
        <FontAwesomeIcon :icon="stop" />
      </el-button>
    </el-tooltip>
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
.btn-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  background-color: #f9fafc;
  >.btn-servo {
    width: 100px;
    height: 100px;
  }
}

</style>
