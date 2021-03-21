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
        />
        <el-input
          v-model.trim="form.password"
          placeholder="Password"
          show-password
          class="password"
        />
        <el-button
          type="primary"
          round
          class="submit"
          @click="handleSignIn"
        >
          Sign in
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { auth } from '../api'
import { useNotification } from '../utils'
export default {
  name: 'SignIn',
  setup () {
    const form = reactive({
      email: '',
      password: ''
    })

    const handleSignIn = () => {
      if (form.email === '' || form.password === '') {
        useNotification.error('Sign in error', 'Email and Password are required!')
        return
      }
      auth.signIn(form.email, form.password)
    }

    return {
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
  background: #fcfcfc;
  height: calc(100vh - 61px);
  overflow-y: hidden;
  >.card {
    width: 400px;
    margin-top: 4rem;
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
