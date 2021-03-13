<template>
  <ul class="log-wrapper">
    <li
      v-for="log in logs"
      :key="log"
    >
      {{ log }}
    </li>
  </ul>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  name: 'TabLog',
  setup () {
    const store = useStore()
    const logs = computed(() => store.getters['Drone/getLogs'])

    return {
      logs
    }
  }
}
</script>

<style lang="scss" scoped>
.log-wrapper{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  list-style-type: '\276F';
  padding-inline-start: 20px;
  line-height: 1.6rem;
  background-color: #f9fafc;
}
</style>
