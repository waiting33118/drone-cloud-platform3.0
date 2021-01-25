<template>
  <div
    id="log"
    class="tab-pane fade"
  >
    <div class="tab-container">
      <ul class="log-container p-2">
        <li
          v-for="log in logs"
          :key="log"
        >
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
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
.log-container{
  overflow-y: auto;
  list-style-type:none;
}
li {
  font-size: 0.9rem;
  word-break: break-all;
}
</style>
