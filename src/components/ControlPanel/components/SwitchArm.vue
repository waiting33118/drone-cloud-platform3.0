<template>
  <el-switch
    v-model="propsStatus"
    active-color="#13ce66"
    inactive-text="DISARM"
    active-text="ARM"
    @change="handleClick"
  />
</template>

<script>
import { arm, disarm } from '../../../api'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'SwitchArm',
  setup () {
    const store = useStore()
    const propsStatus = computed({
      get: () => store.getters['Drone/getDronePropsStatus'],
      set: value => value
    })
    const handleClick = () => propsStatus.value ? disarm() : arm()
    return {
      propsStatus,
      handleClick
    }
  }
}
</script>
