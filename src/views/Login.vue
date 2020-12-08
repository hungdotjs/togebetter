<template>
  <div class="page">
    <div class="page--login">
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
      <social-login></social-login>
      <div class="text-center">
        <div class="mb-16">
          <el-link><i class="el-icon-question"></i> Forgot your password?</el-link>
        </div>
        <div>
          <router-link to="/signup" tag="el-link">Sign up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from '@/firebase';
import SocialLogin from '@/components/atoms/SocialLogin.vue';

export default {
  name: 'Login',
  components: {
    SocialLogin,
  },
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
          db.collection('users')
            .doc(user.uid)
            .get()
            .then(() => {
              this.loading = false;
              this.$router.push('/questions');
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.$message({
            type: 'error',
            message: errorMessage,
          });
          this.loading = false;
        });
    },
  },
};
</script>
