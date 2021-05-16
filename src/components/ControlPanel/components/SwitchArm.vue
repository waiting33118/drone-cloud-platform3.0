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
import { drone } from '../../../api'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  name: 'SwitchArm',
  setup () {
    const store = useStore()
    const userInfo = computed(() => store.getters['User/getUserInfo'])
    const propsStatus = computed({
      get: () => store.getters['Drone/getDronePropsStatus'],
      set: value => value
    })
    const handleClick = () => propsStatus.value ? drone.disarm(userInfo.value.droneId) : drone.arm(userInfo.value.droneId)
    return {
      propsStatus,
      handleClick
    }
  }
}
</script>
