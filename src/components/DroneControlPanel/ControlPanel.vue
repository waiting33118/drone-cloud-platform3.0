<template>
  <div>
    <ul
      id="myTab"
      class="nav nav-tabs"
    >
      <li class="nav-item">
        <a
          id="home-tab"
          class="nav-link active"
          href="#control"
          data-bs-toggle="tab"
        >Control</a>
      </li>
      <li class="nav-item">
        <a
          id="profile-tab"
          class="nav-link"
          href="#servo"
          data-bs-toggle="tab"
        >Servo</a>
      </li>
      <li class="nav-item">
        <a
          id="contact-tab"
          class="nav-link"
          href="#camera"
          data-bs-toggle="tab"
        >Camera</a>
      </li>
      <li class="nav-item">
        <a
          id="contact-tab"
          class="nav-link"
          href="#log"
          data-bs-toggle="tab"
        >Log</a>
      </li>
    </ul>
    <div
      id="myTabContent"
      class="tab-content"
    >
      <!-- Tab Containers -->
      <TabControl />
      <TabServo />
      <TabCamera />
      <TabLog />
    </div>
  </div>
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
  }
}
</script>

<style lang="scss" scoped>
  #myTab{
    height: 43px;
    >li >.active{
      background-color: #048eff;
      color: white;
    }
  }
  #myTabContent{
    height: calc((100vh - 58px) / 2 - 43px); // 58px => navbar; 43px => tab
  }
</style>
