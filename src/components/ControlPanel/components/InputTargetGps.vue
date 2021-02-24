<template>
  <div class="input-wrapper">
    <el-input
      v-model="coords.lng"
      prefix-icon="el-icon-location"
      :disabled="true"
    >
      <template #prepend>
        Lng
      </template>
    </el-input>

    <el-input
      v-model="coords.lat"
      prefix-icon="el-icon-location"
      :disabled="true"
    >
      <template #prepend>
        Lat
      </template>
    </el-input>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'InputTargetGps',
  setup () {
    const store = useStore()
    const coords = computed(() => store.getters['Drone/getTargetGps'])
    return {
      coords
    }
  }
}
</script>
<style lang="scss" scoped>
.input-wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}
</style>
