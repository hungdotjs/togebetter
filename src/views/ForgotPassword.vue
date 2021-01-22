<template>
  <div class="page">
    <div class="page--login">
      <el-alert
        v-if="isSended"
        :title="`Account recovery email sent to ${email}`"
        type="success"
        description="If you don’t see this email in your inbox within 15 minutes, look for it in your junk mail folder. If you find it there, please mark it as “Not Junk”."
        show-icon
        :closable="false"
      >
      </el-alert>
      <div v-else>
        <h1 class="text-center">Account Recovery</h1>
        <p>Enter your email address and we’ll send you a recovery link.</p>
        <el-form ref="form">
          <el-form-item
            label="Email"
            :rules="[
              { required: true, message: 'Please input email address', trigger: 'blur' },
              {
                type: 'email',
                message: 'Please input correct email address',
                trigger: ['blur', 'change'],
              },
            ]"
          >
            <el-input type="email" v-model="email" placeholder="Enter your email"></el-input>
            <p v-if="error" class="text-small color-error mt-8">{{ error }}</p>
          </el-form-item>
          <div class="text-center">
            <el-button
              type="primary"
              size="small"
              :loading="loading"
              @click="sendEmail"
              class="mb-16"
            >
              Send recovery email
            </el-button>
            <p>
              New user?
              <router-link :to="{ name: 'signup' }" class="base-link">Sign up</router-link>
            </p>
            <p>
              Already registered?
              <router-link class="base-link" :to="{ name: 'login' }">Login</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '@/firebase';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '',
      error: null,
      loading: false,
      isSended: false,
    };
  },

  methods: {
    validate() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.sendEmail();
        } else {
          console.log('error submit!!');
        }
      });
    },

    sendEmail() {
      if (!this.email) {
        this.error = 'Please type in a valid email address.';
        return;
      }
      this.error = null;
      this.loading = true;

      auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.loading = false;
          this.isSended = true;
        })
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
        });
    },
  },
};
</script>
