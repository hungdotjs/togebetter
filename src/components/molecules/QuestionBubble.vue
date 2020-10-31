<template>
  <div class="question-bubble">
    <bubble v-if="content" :userID="content.ownerID" :createdAt="content.createdAt">
      <div @click="goTo">
        <p class="color-secondary" v-if="content.questionType">{{ questionType }}</p>
        <p class="question-bubble__question__text text-truncate">
          {{ content.content }}
        </p>
        <div v-if="content.photoURL">
          <el-image :src="content.photoURL" class="chat-bubble__image"></el-image>
        </div>

        <el-button
          class="question-bubble__number"
          :type="totalAnswer ? 'success' : 'primary'"
          circle
        >
          {{ totalAnswer }}
        </el-button>
      </div>
    </bubble>
  </div>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';

export default {
  components: {
    Bubble,
  },

  props: {
    content: {
      type: Object,
    },
  },

  data() {
    return {};
  },

  computed: {
    totalAnswer() {
      return this.content.comments.length;
    },

    questionType() {
      switch (this.content.questionType) {
        case 'what-mean':
          return 'What does this mean?';
        case 'sound-natural':
          return 'Does this sound natural?';
        case 'example':
          return 'Please show me example sentences with?';
        case 'difference':
          return "What's the difference?";
        case 'your-pronounce':
          return 'Please show me how to pronounce?';
        case 'my-pronounce':
          return "How's my pronunciation?";
        case 'free-question':
          return 'Ask about a country, culture or anything you want.';
        default:
          return 'How do you say this?';
      }
    },
  },

  methods: {
    goTo() {
      this.$router.push({ name: 'questions-detail', params: { id: this.content.id } });
    },
  },
};
</script>
