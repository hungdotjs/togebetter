<template>
  <div class="question-simple">
    <router-link
      tag="div"
      :to="`/questions/${question.id}`"
      style="margin-bottom: 4px"
      class="text-truncate"
    >
      <span class="color-secondary">{{ question.questionType | questionType }}</span>
      {{ filterContent }}
    </router-link>
    <el-tag :type="haveFeaturedAnswer ? 'success' : 'info'" size="small">
      {{ answerAmount }} answers
    </el-tag>
  </div>
</template>

<script>
import filterWords from '@/helpers/filterWords';

export default {
  props: {
    question: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    answerAmount() {
      return this.question.comments.length;
    },

    haveFeaturedAnswer() {
      return this.question.featuredAnswer;
    },

    haveBadWord() {
      return filterWords.isProfane(this.question.content);
    },

    filterContent() {
      if (this.haveBadWord) return filterWords.clean(this.question.content);
      return this.question.content;
    },
  },
};
</script>
