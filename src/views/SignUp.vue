<template>
  <div class="login-wrapper">
    <el-card
      class="card"
    >
      <template #header>
        <div class="card__header">
          <span>Sign Up</span>
        </div>
      </template>
      <div class="card__body">
        <el-input
          v-model.trim="form.email"
          placeholder="Email (required)"
          class="user_input"
          clearable
          type="email"
        />
        <el-input
          v-model.trim="form.password"
          placeholder="Password (required, length >=8 characters)"
          show-password
          min="8"
          class="user_input"
          type="password"
        />
        <el-input
          v-model.trim="form.checkPassword"
          placeholder="checkPassword (required)"
          show-password
          min="8"
          class="user_input"
          type="password"
        />
        <el-input
          v-model.trim="form.name"
          placeholder="Name"
          class="user_input"
          clearable
        />
        <el-input
          v-model.trim="form.droneId"
          placeholder="Drone ID (required)"
          class="user_input"
          clearable
        />
        <el-button
          type="primary"
          round
          class="submit"
          :loading="isLoading"
          @click="handleSignUp"
        >
          Sign Up
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { useNotification } from '../utils'
import { auth } from '../api'
import { useRouter } from 'vue-router'
export default {
  name: 'SignUp',
  setup () {
    const router = useRouter()
    const isLoading = ref(false)
    const form = reactive({
      email: '',
      name: '',
      password: '',
      checkPassword: '',
      droneId: ''
    })

    const handleSignUp = async () => {
      isLoading.value = true
      if (form.email === '' || form.password === '' || form.checkPassword === '' || form.droneId === '') {
        useNotification.error('Sign Up Error', 'Email, Password, checkPassword and droneId are all required!')
        isLoading.value = false
        return
      }

      if (form.password.trim().length < 8) {
        useNotification.error('Sign Up Error', 'Password must above or include 8 characters!')
        isLoading.value = false
        form.password = ''
        form.checkPassword = ''
        return
      }

      if (form.password !== form.checkPassword) {
        isLoading.value = false
        form.password = ''
        form.checkPassword = ''
        useNotification.error('Sign Up Error', 'Password and confirm password does not match!')
        return
      }
      const isSuccess = await auth.signUp(form.email, form.password, form.checkPassword, form.name, form.droneId)
      if (isSuccess) {
        router.push({ path: '/signin' })
        return
      }
      isLoading.value = false
      form.password = ''
      form.checkPassword = ''
    }

    return {
      isLoading,
      form,
      handleSignUp
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper {
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fcfcfc;
  height: calc(100vh - 61px);
  overflow-y: hidden;
  >.card {
    width: 400px;
    .card__header {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      font-weight: 1000;
    }
    .card__body {
      padding: 2rem 0;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      >.user_input{
        margin-bottom: 1.5rem;
      }
      >.submit {
        margin-top: 1rem;
        width: 100%;
      }
    }
  }
}
</style>
