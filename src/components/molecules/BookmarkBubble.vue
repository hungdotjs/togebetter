<template>
  <div class="question-bubble">
    <bubble
      v-if="content"
      :userID="content.ownerID"
      :createdAt="content.createdAt"
      :hideInterestLanguage="true"
      :hasEffect="true"
    >
      <div @click="goTo">
        <p class="color-secondary" v-if="content.questionType">{{ questionType }}</p>
        <p v-if="content.content" class="question-bubble__content text-truncate">
          {{ content.content }}
        </p>
        <div v-if="content.photoURL">
          <el-image :src="content.photoURL" class="chat-bubble__image"></el-image>
        </div>
        <div v-if="content.audioURL">
          <audio :src="content.audioURL" class="chat-bubble__audio" controls></audio>
        </div>
      </div>
    </bubble>
  </div>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';
import languages from '@/data/languages';

export default {
  name: 'QuestionBubble',
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
    languageName() {
      return languages.find((item) => item.code === this.content.lang).name;
    },

    questionType() {
      switch (this.content.questionType) {
        case 'how-say':
          return `How do you say this in ${this.languageName}?`;
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
        default:
          return '';
      }
    },
  },

  methods: {
    goTo() {
      this.$router.push({ name: 'questions-detail', params: { id: this.content.questionID } });
    },
  },
};
</script>
