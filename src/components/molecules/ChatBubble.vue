<template>
  <bubble v-if="content" :userID="content.ownerID" :createdAt="content.createdAt">
    <p v-if="content.lang">
      Question about <b>{{ languageName }}</b>
    </p>
    <p class="color-secondary" v-if="content.questionType">{{ questionType }}</p>
    <div v-if="content.photoURL">
      <el-image :src="content.photoURL" class="chat-bubble__image"></el-image>
    </div>
    <div v-if="content.audioURL">
      <audio :src="content.audioURL" class="chat-bubble__audio" controls></audio>
    </div>
    <p>{{ content.content }}</p>

    <div class="chat-bubble__command">
      <div class="chat-bubble__social">
        <div class="chat-bubble__button" v-if="!content.lang">
          <p><i class="iconfont icon-like"></i></p>
          <p class="chat-bubble__button__text">0</p>
        </div>
        <div class="chat-bubble__button" v-if="!content.lang">
          <p><i class="iconfont icon-dislike"></i></p>
          <p class="chat-bubble__button__text">0</p>
        </div>
        <div class="chat-bubble__button">
          <p><i class="iconfont icon-share"></i></p>
          <p class="chat-bubble__button__text">Share</p>
        </div>
        <div class="chat-bubble__button">
          <p><i class="iconfont icon-bookmark"></i></p>
          <p class="chat-bubble__button__text">Save</p>
        </div>
      </div>

      <div class="chat-bubble__button">
        <p><i class="iconfont icon-ellipsis"></i></p>
        <p class="chat-bubble__button__text">More</p>
      </div>
    </div>
  </bubble>
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

  computed: {
    languageName() {
      return languages.find((item) => item.code === this.content.lang).name;
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
};
</script>
