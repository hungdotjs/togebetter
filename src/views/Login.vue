<template>
  <div class="page page--login">
    <h1 class="title text-center">Login</h1>
    <el-form label-position="top" :model="formLogin">
      <el-form-item label="Username or Email Address" size="medium">
        <el-input v-model="formLogin.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" size="medium">
        <el-input v-model="formLogin.password"></el-input>
      </el-form-item>
      <el-form-item class="text-center">
        <el-checkbox v-model="rememberMe">Keep me logged in</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-100" size="medium" round>Login</el-button>
      </el-form-item>
    </el-form>
    <el-divider>or</el-divider>
    <div class="mb-16">
      <el-button size="medium" class="w-100" round>
        <span class="center">
          <img
            src="https://cdn.svgporn.com/logos/google-icon.svg"
            alt="google"
            width="16"
            height="16"
            class="mr-16"
          />
          Sign in with Google
        </span>
      </el-button>
    </div>
    <div class="mb-16">
      <el-button size="medium" class="w-100 btn--facebook" round>
        <span class="center">
          <img
            src="https://cdn.svgporn.com/logos/facebook.svg"
            alt="google"
            width="16"
            height="16"
            class="mr-16"
          />
          Sign in with Facebook
        </span>
      </el-button>
    </div>
    <el-link><i class="el-icon-question"></i> Forgot your password?</el-link>
    <el-link><i class="el-icon-question"></i> Didn't receive the confirmation email?</el-link>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';

export default {
  name: 'Login',
  data() {
    return {
      formLogin: {
        username: '',
        password: '',
      },
      rememberMe: true,
    };
  },

  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
