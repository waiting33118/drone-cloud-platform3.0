<template>
  <div class="btn-wrapper">
    <el-tooltip
      class="item"
      effect="dark"
      content="Reset to default position"
      placement="top"
    >
      <el-button
        type="warning"
        round
        @click="handleClick"
      >
        Reset
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import { drone } from '../../../api'
import { useStore } from 'vuex'
export default {
  name: 'ButtonReset',
  setup () {
    const store = useStore()
    const handleClick = () => {
      store.dispatch('Drone/setGimbalY', 1500)
      store.dispatch('Drone/setGimbalX', 1500)
      drone.gimbalControl('GIMBAL_LEFT_RIGHT', 1500)
      drone.gimbalControl('GIMBAL_FRONT_BACK', 1500)
    }

    return {
      handleClick
    }
  }
}
</script>
<style lang="scss" scoped>
.btn-wrapper {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  >.el-button {
    width: 150px;
  }
}

</style>
