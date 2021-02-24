<template>
  <el-tabs
    v-model="activeName"
    :stretch="true"
  >
    <el-tab-pane
      label="Control"
      name="control"
      class="tab-container"
    >
      <TabControl />
    </el-tab-pane>
    <el-tab-pane
      label="Servo"
      name="servo"
      class="tab-container"
    >
      <TabServo />
    </el-tab-pane>
    <el-tab-pane
      label="Camera"
      name="camera"
      class="tab-container"
    >
      <TabCamera />
    </el-tab-pane>
    <el-tab-pane
      label="Log"
      name="log"
      class="tab-container"
    >
      <TabLog />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import TabControl from '@/components/ControlPanel/tabContol.vue'
import TabServo from '@/components/ControlPanel/tabServo.vue'
import TabCamera from '@/components/ControlPanel/tabCamera.vue'
import TabLog from '@/components/ControlPanel/tabLog.vue'
export default {
  name: 'ControlPanel',
  components: {
    TabControl,
    TabServo,
    TabCamera,
    TabLog
  },
  setup () {
    return {
      activeName: 'control'
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-container {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  @media screen and (min-width:768px) {
    height: calc(((100vh - 61px) / 2) - 55px);
  }
}
</style>
