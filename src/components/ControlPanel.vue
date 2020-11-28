<template>
  <v-container>
    <v-row>
      <v-col>
        <v-switch
          v-model="isTakeOff"
          :disabled="isTakeOff"
          color="success"
          inset
          label="TakeOff"
          @change="handleTakeOff"
        />
      </v-col>
      <v-col>
        <v-switch
          v-model="isTakeOff"
          :disabled="!isTakeOff"
          color="red"
          inset
          label="Land"
          @change="handleLanding"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-slider
          v-model="flyHeight"
          label="Fly Height (m)"
          thumb-color="blue"
          thumb-label="always"
          min="1"
          max="30"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="props.coords.lat"
          color="blue"
          label="Latitude"
          outlined
          readonly
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="props.coords.lng"
          color="blue"
          label="Longitude"
          outlined
          readonly
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  name: 'ControlPanel',
  props: {
    coords: {
      type: Object,
      required: true,
      default: (lng = 0, lat = 0) => ({ lng, lat })
    }
  },
  setup (props) {
    const isTakeOff = ref(false)
    const flyHeight = ref(3)

    const handleTakeOff = (boolean) => {
      console.log(boolean)
    }
    const handleLanding = (boolean) => {
      console.log(boolean)
    }
    return {
      isTakeOff,
      flyHeight,
      handleTakeOff,
      handleLanding,
      props
    }
  }
}
</script>

<style>

</style>
