<template>
  <div>
    <el-button size="mini" icon="el-icon-warning-outline" plain @click="openDialog">
      {{ $t('report') }}
    </el-button>
    <el-dialog
      title="Report User"
      :visible.sync="visible"
      custom-class="base-dialog report"
      append-to-body
    >
      <el-radio-group v-model="type" class="mb-16">
        <el-radio label="Harassment">Harassment</el-radio>
        <el-radio label="Content is spam">Content is spam</el-radio>
        <el-radio label="Question Policy">
          Question Policy
        </el-radio>
        <el-radio label="Other">
          Other
        </el-radio>
      </el-radio-group>
      <p>Message</p>
      <el-input type="textarea" v-model="message"></el-input>
      <div class="mt-16 text-right">
        <el-button size="mini" @click="visible = false">Cancel</el-button>
        <el-button size="mini" type="primary" @click="send">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ReportUser',
  props: {
    userID: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      visible: false,
      type: '',
      message: '',
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  methods: {
    openDialog() {
      this.visible = true;
    },

    send() {
      this.loading = true;
      const input = {
        type: this.type,
        senderID: this.user.id,
        targetID: this.userID,
        targetType: 'user',
        message: this.message,
      };

      this.$store.dispatch('api/report', input);

      const timeout = setTimeout(() => {
        this.visible = false;
        this.$message({
          type: 'success',
          message: 'Thanks for your report!',
        });
        clearTimeout(timeout);
      }, 500);
    },
  },
};
</script>
