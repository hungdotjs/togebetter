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
          <el-image
            :src="content.photoURL"
            fit="cover"
            class="chat-bubble__question-image"
            lazy
          ></el-image>
        </div>
        <div class="question-bubble__sound-box" v-if="content.audioURL">
          <el-image
            src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/img%2Fspeaker.png?alt=media&token=13ccd541-a4b0-45f9-8122-77f2308c3cd8"
            style="width: 40px; height: 36px;"
          ></el-image>
        </div>
        <div class="d-flex">
          <el-button
            class="question-bubble__number"
            :type="totalAnswer ? 'primary' : 'success'"
            circle
          >
            {{ totalAnswer }}
          </el-button>
          <!-- <el-button
            v-if="content.audioURL"
            class="question-bubble__number question-bubble__number--audio"
            icon="iconfont icon-sound"
            circle
          >
          </el-button> -->
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
