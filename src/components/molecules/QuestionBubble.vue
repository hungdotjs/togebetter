<template>
  <div class="question-bubble">
    <bubble
      v-if="content"
      :userID="content.ownerID"
      :createdAt="content.createdAt"
      :hideInterestLanguage="true"
    >
      <div @click="goTo">
        <p class="color-secondary" v-if="content.questionType">{{ questionType }}</p>
        <p v-if="content.content" class="question-bubble__content text-truncate">
          {{ content.content }}
        </p>
        <div v-if="content.photoURL">
          <el-image :src="content.photoURL" class="chat-bubble__image"></el-image>
        </div>
        <div class="d-flex">
          <el-button
            class="question-bubble__number"
            :type="totalAnswer ? 'primary' : 'success'"
            circle
          >
            {{ totalAnswer }}
          </el-button>
          <el-button
            v-if="content.audioURL"
            class="question-bubble__number question-bubble__number--audio"
            icon="iconfont icon-sound"
            circle
          >
          </el-button>
        </div>
      </div>
    </bubble>
  </div>
</template>

<script>
import Bubble from '@/components/molecules/Bubble.vue';
import languages from '@/data/languages';

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
      this.$router.push({ name: 'questions-detail', params: { id: this.content.id } });
    },
  },
};
</script>
