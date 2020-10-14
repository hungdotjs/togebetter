<template>
  <div class="container question-detail">
    <chat-bubble></chat-bubble>

    <div class="answer-form container">
      <div class="answer-form__input-wrapper">
        <el-input
          class="answer-form__input"
          type="textarea"
          v-model="answer"
          placeholder="Answer in his/her native language as he/she is a beginner speaker."
          :autosize="{ minRows: 3, maxRows: 5 }"
          resize="none"
        >
        </el-input>
        <el-button
          class="answer-form__send"
          type="primary"
          size="mini"
          icon="el-icon-right"
        ></el-button>
      </div>
      <div class="button-group">
        <div class="button-group__item">
          <i class="iconfont icon-keyboard"></i>
        </div>
        <div class="button-group__item" @click="openMic">
          <i class="iconfont icon-mic"></i>
        </div>
        <div class="button-group__item">
          <i class="iconfont icon-camera"></i>
        </div>
        <div class="button-group__item">
          <i class="iconfont icon-smile"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBubble from '@/components/molecules/ChatBubble.vue';

export default {
  name: 'Home',
  components: {
    ChatBubble,
  },

  data() {
    return {
      answer: '',
    };
  },

  methods: {
    openMic() {
      navigator.permissions
        .query(
          // { name: 'camera' }
          { name: 'microphone' },
          // { name: 'geolocation' }
          // { name: 'notifications' }
          // { name: 'midi', sysex: false }
          // { name: 'midi', sysex: true }
          // { name: 'push', userVisibleOnly: true }
          // { name: 'push' } // without userVisibleOnly isn't supported in chrome M45, yet
        )
        .then((permissionStatus) => {
          console.log(permissionStatus); // granted, denied, prompt
        });
    },
  },
};
</script>
