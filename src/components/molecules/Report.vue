<template>
  <el-dialog :visible.sync="visible1" custom-class="report" center>
    <h1 slot="title" class="m-0">Report</h1>
    <p>Please select a problem to continue</p>
    <p class="mb-16">We continue to try to make this environment a great one for everybody.</p>
    <el-radio-group v-model="value" class="mb-16">
      <el-radio label="Rude or vulgar">Rude or vulgar</el-radio>
      <el-radio label="Harassment or hate speech">Harassment or hate speech</el-radio>
      <el-radio label="Spam or copyright issue">Spam or copyright issue</el-radio>
      <el-radio label="Inappropriate listings message/category">
        Inappropriate listings message/category
      </el-radio>
      <el-radio label="Other">
        Other
      </el-radio>
    </el-radio-group>
    <p class="text-bold">Reported URL</p>
    <el-input v-model="dataUrl" class="mb-16"></el-input>
    <p class="text-bold">Message</p>
    <p class="text-small">
      Please provide any additional information or context that will help us understand and handle
      the situation.
    </p>
    <el-input v-model="message" type="textarea" placeholder="..." class="mb-16"></el-input>
    <el-button type="primary" size="small" @click="send" :loading="loading">
      Send feedback
    </el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    userID: {
      type: String,
      required: true,
    },

    visible: {
      type: Boolean,
      default: false,
    },

    url: {
      type: String,
    },
  },

  data() {
    return {
      loading: false,
      value: '',
      message: '',
    };
  },

  computed: {
    dataUrl() {
      return this.url;
    },

    visible1: {
      get() {
        return this.visible;
      },

      set(value) {
        this.$emit('update:visible', value);
      },
    },
  },

  methods: {
    send() {
      this.loading = true;
      const input = {
        value: this.value,
        message: this.message,
        url: this.dataUrl,
        userID: this.userID,
      };
      const timeout = setTimeout(() => {
        this.$emit('send', input);
        this.loading = false;
        this.visible1 = false;
        clearTimeout(timeout);
      }, 500);
    },
  },
};
</script>

<style lang="scss">
.report {
  width: 90%;
  max-width: 500px;

  .el-radio-group {
    display: flex;
    flex-direction: column;
  }

  .el-radio {
    padding: 8px;
    border-radius: 8px;

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
