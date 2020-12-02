<template>
  <v-container>
    <v-row>
      <v-col>
        <v-switch
          v-model="isArm"
          :disabled="isTakeOff"
          color="success"
          inset
          :label="isArm?'Arm':'Disarm'"
          @change="handleDroneSecurity"
        />
      </v-col>
      <v-col>
        <v-switch
          v-model="isTakeOff"
          :disabled="!isArm || isTakeOff"
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
      <v-col>
        <v-text-field
          v-model="props.coords.lat"
          hide-details
          color="blue"
          label="Latitude"
          outlined
          readonly
        />
      </v-col>
      <v-col>
        <v-text-field
          v-model="props.coords.lng"
          hide-details
          color="blue"
          label="Longitude"
          outlined
          readonly
        />
      </v-col>
      <v-col
        align-self="center"
      >
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
      <v-col class="mode-selection">
        <v-btn-toggle
          v-model="flightMode"
          mandatory
          color="blue"
          rounded
          dense
          @change="handleModeChange"
        >
          <v-btn
            v-for="label in btnGroupLabel"
            :key="label"
            :disabled="!isArm"
          >
            {{ label }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { reactive, ref } from '@vue/composition-api'
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
    const isArm = ref(false)
    const isTakeOff = ref(false)
    const isLand = ref(false)
    const altitude = ref(3)
    const flightMode = ref(0)
    const goToIsLoading = ref(false)
    const btnGroupLabel = reactive(['STABILIZE', 'ACRO', 'ALT_HOLD', 'AUTO', 'GUIDED', 'LOITER', 'RTL', 'CIRCLE'])

    const handleDroneSecurity = (isArm) => {
      isArm
        ? droneControl.arm()
        : droneControl.disArm()
    }

    const handleTakeOff = () => {
      droneControl.takeOff(altitude.value)
    }

    const handleLanding = () => {
      emit('resetDestination')
      altitude.value = 3
      flightMode.value = 0
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

    const handleModeChange = (mode) => droneControl.changeFlightMode(btnGroupLabel[mode])

    return {
      isArm,
      isTakeOff,
      isLand,
      goToIsLoading,
      altitude,
      flightMode,
      btnGroupLabel,
      handleDroneSecurity,
      handleTakeOff,
      handleLanding,
      handleGoTo,
      handleFlyHeightChange,
      handleModeChange,
      props
    }
  }
}
</script>

<style lang="scss" scoped>
.mode-selection{
  overflow-x:scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(132, 217, 238, 0.8);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
  }
}
</style>
