<template>
  <div
    id="camera"
    class="tab-pane fade"
  >
    <div class="tab-container">
      <div class="d-flex flex-column justify-content-evenly p-2">
        <InputGimbalY />
        <InputGimbalX />
        <ButtonReset />
      </div>
    </div>
  </div>
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
