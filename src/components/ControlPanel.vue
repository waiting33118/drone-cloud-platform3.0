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
      <v-col align-self="center">
        <v-btn
          elevation="2"
          rounded
          :disabled="!isTakeOff"
          :loading="goToIsLoading"
          color="primary"
          @click="handleGoTo"
        >
          GoTo
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-slider
          v-model="altitude"
          label="Altitude (m)"
          thumb-color="blue"
          thumb-label="always"
          hide-details
          :disabled="!isTakeOff"
          min="1"
          max="30"
          @change="handleFlyHeightChange"
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
import { Toast } from './../utils/sendAlert'
import droneControl from './../services/droneControl'
export default {
  name: 'ControlPanel',
  props: {
    coords: {
      type: Object,
      required: true,
      default: (lng = -1, lat = -1) => ({ lng, lat })
    }
  },
  emits: ['resetDestination'],
  setup (props, { emit }) {
    const isTakeOff = ref(false)
    const altitude = ref(3)
    const goToIsLoading = ref(false)

    const handleTakeOff = () => droneControl.takeOff(altitude.value)

    const handleLanding = () => {
      emit('resetDestination')
      altitude.value = 3
      droneControl.land()
    }

    const handleGoTo = () => {
      if (props.coords.lat === -1 && props.coords.lng === -1) {
        Toast.fire({ icon: 'error', title: 'Please set the destination point!' })
        return
      }
      goToIsLoading.value = true
      droneControl.goTo(Number(props.coords.lng).toFixed(6), Number(props.coords.lat).toFixed(6), altitude.value)
      goToIsLoading.value = false
    }

    const handleFlyHeightChange = () => droneControl.changeFlightHeight(altitude.value)

    return {
      isTakeOff,
      goToIsLoading,
      altitude,
      handleTakeOff,
      handleLanding,
      handleGoTo,
      handleFlyHeightChange,
      props
    }
  }
}
</script>

<style>

</style>
