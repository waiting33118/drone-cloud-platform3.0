<template>
  <div class="container-fluid px-0">
    <ControlPanel class="control-panel" />
    <Stream class="stream" />
    <Mapbox class="mapbox" />
  </div>
</template>

<script>
import Mapbox from '@/components/Home/Mapbox.vue'
import ControlPanel from '@/components/Home/ControlPanel.vue'
import Stream from '@/components/Home/Stream.vue'
export default {
  name: 'Home',
  components: {
    Mapbox,
    ControlPanel,
    Stream
  }
}
</script>

<style lang="scss" scoped>
.container-fluid{
  height: calc(100% - 58px);  // 58px = navbar height
  display: grid;
  grid-template-columns: repeat(7,minmax(auto,500px));
  grid-template-rows: repeat(2,minmax(250px,1fr));
    >.control-panel{
      grid-column: 1 / 2;
      grid-row: 1;
      border: 2px solid gainsboro;
    }
    >.stream{
      width: 500px;
      grid-column: 1 / 2;
      grid-row: 2;
      border: 2px solid gainsboro;
    }
    >.mapbox{
      grid-column: 2 / 8;
      grid-row: 1 / span 2;
      border: 2px solid gainsboro;
      position: relative;
    }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(6,minmax(auto,350px));
    >.control-panel{
      grid-column: 1 / 2;
      grid-row: 1;
      border: 2px solid gainsboro;
    }
    >.stream{
      width: 350px;
      grid-column: 1 / 2;
      grid-row: 2;
      border: 2px solid gainsboro;
    }
    >.mapbox{
      grid-column: 2 / 7;
      grid-row: 1 / span 2;
      border: 2px solid gainsboro;
      position: relative;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3,minmax(350px,1fr));
    >.control-panel{
      grid-column: 1 ;
      grid-row: 1;
      border: 2px solid gainsboro;
    }
    >.stream{
      width: 100%;
      grid-column: 1 ;
      grid-row: 2;
      border: 2px solid gainsboro;
    }
    >.mapbox{
      grid-column: 1;
      grid-row: 3;
      border: 2px solid gainsboro;
      position: relative;
    }
  }
}
</style>
