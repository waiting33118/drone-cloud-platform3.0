<template>
  <div class="login-wrapper">
    <el-card
      class="card"
    >
      <template #header>
        <div class="card__header">
          <span>Sign In</span>
        </div>
      </template>
      <div class="card__body">
        <el-input
          v-model.trim="form.email"
          placeholder="Email"
          class="email"
          clearable
          type="email"
        />
        <el-input
          v-model.trim="form.password"
          placeholder="Password"
          show-password
          class="password"
          type="password"
          @keyup.enter="handleSignIn"
        />
        <el-button
          type="primary"
          round
          class="submit"
          :loading="isLoading"
          @click="handleSignIn"
        >
          Sign In
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { auth } from '../api'
import { useNotification } from '../utils'
import { useRouter } from 'vue-router'
export default {
  name: 'SignIn',
  setup () {
    const router = useRouter()
    const isLoading = ref(false)
    const form = reactive({
      email: '',
      password: ''
    })

    const handleSignIn = async () => {
      isLoading.value = true
      if (form.email === '' || form.password === '') {
        useNotification.error('Sign In Error', 'Email and Password are required!')
        isLoading.value = false
        return
      }
      const isSuccess = await auth.signIn(form.email, form.password)
      if (isSuccess) {
        router.push({ path: '/dronecontrolpanel' })
        return
      }
      isLoading.value = false
      form.password = ''
    }

    return {
      isLoading,
      form,
      handleSignIn
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
      >.email,
      .password {
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
