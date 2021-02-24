<template>
  <el-row>
    <el-col :span="24">
      <InputGimbalY />
    </el-col>
    <el-col :span="24">
      <InputGimbalX />
    </el-col>
    <el-col :span="24">
      <ButtonReset />
    </el-col>
  </el-row>
</template>

<script>
import InputGimbalY from '@/components/ControlPanel/components/InputGimbalY.vue'
import InputGimbalX from '@/components/ControlPanel/components/InputGimbalX.vue'
import ButtonReset from '@/components/ControlPanel/components/ButtonReset.vue'
export default {
  name: 'TabCamera',
  components: {
    InputGimbalY,
    InputGimbalX,
    ButtonReset
  },
  setup () {
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  height: 100%;
  background-color: #f9fafc;
  padding: 10px 45px;
  margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
</style>
