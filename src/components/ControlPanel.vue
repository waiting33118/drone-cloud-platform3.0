<template>
  <v-container class="pa-2">
    <v-row>
      <v-col
        cols="3"
        align-self="center"
      >
        <v-btn
          elevation="3"
          :color="props.isConnected?'red':'light-green'"
          rounded
          @click="props.handleConnect"
        >
          {{ props.isConnected?'Stop':'Start' }}
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-switch
          v-model="isArm"
          :disabled="isTakeOff"
          color="success"
          dense
          hide-details
          :label="isArm?'Arm':'Disarm'"
          @change="handleDroneSecurity"
        />
      </v-col>
      <v-col cols="3">
        <v-switch
          v-model="isTakeOff"
          :disabled="!isArm || isTakeOff"
          color="success"
          dense
          hide-details
          label="TakeOff"
          @change="handleTakeOff"
        />
      </v-col>
      <v-col cols="3">
        <v-switch
          v-model="isTakeOff"
          :disabled="!isTakeOff"
          color="red"
          dense
          hide-details
          label="Land"
          @change="handleLanding"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-slider
          ref="altitudeEl"
          v-model="altitude"
          label="Altitude(m)"
          thumb-color="blue"
          thumb-label="always"
          hide-details
          :disabled="!isTakeOff"
          min="1"
          max="50"
          @change="handleGoTo('altitude')"
        />
      </v-col>
      <v-col>
        <v-slider
          v-model="speed"
          label="Speed(m/s)"
          thumb-color="orange"
          thumb-label="always"
          hide-details
          :disabled="!isTakeOff"
          min="1"
          max="14"
          @change="handleSpeedChange"
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
          dense
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
          dense
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
          @change="handleFlightModeChange"
        >
          <v-btn
            v-for="label in flightModeBtnGroup"
            :key="label"
          >
            {{ label }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          class="mx-1"
          elevation="3"
          rounded
          color="light-blue"
          @click="handleServoControl"
        >
          SERVO_UP
        </v-btn>
        <v-btn
          class="mx-1"
          elevation="3"
          rounded
          color="light-green"
          @click="handleServoControl"
        >
          SERVO_DOWN
        </v-btn>
        <v-btn
          class="mx-1"
          elevation="3"
          rounded
          color="pink"
          @click="handleServoControl"
        >
          SERVO_STOP
        </v-btn>
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
    },
    isConnected: {
      type: Boolean,
      required: true,
      default: false
    },
    handleConnect: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  emits: ['resetDestination'],
  setup (props, { emit }) {
    const isArm = ref(false)
    const isTakeOff = ref(false)
    const isLand = ref(false)
    const altitude = ref(3)
    const speed = ref(3)
    const flightMode = ref(0)
    const goToIsLoading = ref(false)
    const flightModeBtnGroup = reactive(['STABILIZE', 'GUIDED', 'RTL'])

    const handleDroneSecurity = (isArm) => {
      isArm
        ? droneControl.arm()
        : droneControl.disArm()
    }

    const handleTakeOff = () => droneControl.takeOff(altitude.value)

    const handleLanding = () => {
      emit('resetDestination')
      altitude.value = 3
      speed.value = 3
      flightMode.value = 0
      droneControl.land()
    }

    const handleGoTo = (cmd) => {
      if (props.coords.lat === -1 && props.coords.lng === -1 && cmd === 'altitude') {
        droneControl.changeFlightHeight(altitude.value)
        return
      }
      if (props.coords.lat === -1 && props.coords.lng === -1) {
        Toast.fire({ icon: 'error', title: 'Please set the destination point!' })
        return
      }
      goToIsLoading.value = true
      droneControl.goTo(Number(props.coords.lng).toFixed(6), Number(props.coords.lat).toFixed(6), altitude.value)
      goToIsLoading.value = false
    }

    // const handleFlyHeightChange = () => droneControl.changeFlightHeight(altitude.value)
    const handleSpeedChange = () => droneControl.changeAirSpeed(speed.value)
    const handleFlightModeChange = (mode) => droneControl.changeFlightMode(flightModeBtnGroup[mode])
    const handleServoControl = (cmd) => droneControl.sendServoControl(cmd.target.innerText)

    return {
      altitude,
      flightMode,
      flightModeBtnGroup,
      goToIsLoading,
      handleDroneSecurity,
      handleFlightModeChange,
      handleGoTo,
      handleLanding,
      handleServoControl,
      handleSpeedChange,
      handleTakeOff,
      isArm,
      isLand,
      isTakeOff,
      props,
      speed
    }
  }
}
</script>
