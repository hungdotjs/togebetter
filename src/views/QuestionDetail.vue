<template>
  <div class="container">
    <div class="question-detail main-layout">
      <div class="question-detail__content">
        <chat-bubble></chat-bubble>
      </div>

      <div class="answer-form">
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
          <record-audio @done="handleRecordAudio">
            <div class="button-group__item">
              <i class="iconfont icon-mic"></i>
            </div>
          </record-audio>
          <div class="button-group__item">
            <i class="iconfont icon-camera"></i>
          </div>
          <div class="button-group__item">
            <i class="iconfont icon-smile"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatBubble from '@/components/molecules/ChatBubble.vue';
import RecordAudio from '@/components/atoms/RecordAudio.vue';

export default {
  name: 'Home',
  components: {
    ChatBubble,
    RecordAudio,
  },

  data() {
    return {
      answer: '',
      audio: null,
    };
  },

  methods: {
    handleRecordAudio(file) {
      this.audio = file;
    },
  },
};
</script>
