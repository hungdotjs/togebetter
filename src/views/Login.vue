<template>
  <div class="page page--login">
    <h1 class="text-center">Sign in</h1>
    <el-form label-position="top" :model="form">
      <el-form-item label="Email Address" size="large">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="Password" size="large">
        <el-input
          v-model="form.password"
          type="password"
          show-password
          @keyup.enter.native="signIn"
        ></el-input>
      </el-form-item>
      <el-form-item class="text-center">
        <el-checkbox v-model="rememberMe">Keep me logged in</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="w-100"
          size="large"
          :loading="loading"
          round
          @click="signIn"
        >
          Sign in
        </el-button>
      </el-form-item>
    </el-form>
    <el-divider>or</el-divider>
    <div class="mb-16">
      <el-button size="large" class="w-100 btn--google" round>
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
      <el-button size="large" class="w-100 btn--facebook" round>
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
    <div class="text-center">
      <div class="mb-16">
        <el-link><i class="el-icon-question"></i> Forgot your password?</el-link>
      </div>
      <div>
        <router-link to="/signup" tag="el-link">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';
import { Message } from 'element-ui';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      rememberMe: true,
      loading: false,
    };
  },

  methods: {
    signIn() {
      this.loading = true;
      const { email, password } = this.form;

      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          const userData = {
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            email: user.email,
          };
          // Save user to store
          this.$store.commit('auth/saveUser', userData);
          this.loading = false;
          this.$router.push('/home');
        })
        .catch((error) => {
          const errorMessage = error.message;
          Message.error(errorMessage);
          this.loading = false;
        });
    },
  },
};
</script>
