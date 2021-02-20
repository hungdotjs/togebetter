<template>
  <div class="page">
    <div class="page--login account-banned">
      <el-alert :title="`Your Account has been Banned`" type="error" show-icon :closable="false">
        Your Togebetter profile has been banned for activity that violates our
        <router-link to="/about" class="base-link">Terms of Use</router-link>
        <br />
      </el-alert>
      <br />
      <router-link :to="{ name: 'landing-page' }" class="base-link">
        <i class="el-icon-back"></i> Back to home
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountBanned',
  data() {
    return {
      loading: false,
    };
  },
};
</script>
