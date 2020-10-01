<template>
  <div class="container question-detail">
    <chat-bubble></chat-bubble>

    <div class="answer-form">
      <el-input
        type="textarea"
        v-model="answer"
        placeholder="Answer in his/her native language as he/she is a beginner speaker."
        autosize
      >
      </el-input>
      <el-button type="primary" :rows="2" size="mini" icon="el-icon-right"></el-button>
    </div>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';
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

  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>

<style lang="scss" scoped>
.question-detail {
  background: #fff;
}
</style>
