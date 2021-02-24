<template>
  <el-row :gutter="15">
    <el-col :span="12">
      <div class="grid-content">
        <SwitchArm />
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content">
        <SwitchTakeoff />
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="15">
    <el-col :span="8">
      <div class="grid-content">
        <InputAltitude />
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">
        <InputSpeed />
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content">
        <InputYaw />
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="15">
    <el-col :span="24">
      <div class="grid-content">
        <ButtonFlightMode />
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="15">
    <el-col :span="24">
      <div class="grid-content">
        <InputTargetGps />
      </div>
    </el-col>
  </el-row>
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
.el-row {
  padding: 10px;
  background-color: #f9fafc;
  text-align: center;
  margin-bottom: 5px;
  &:last-child {
    margin-bottom: 0;
  }
  .grid-content {
    border-radius: 4px;
    padding: 10px;
    background: #d3dce6;
  }
}

</style>
