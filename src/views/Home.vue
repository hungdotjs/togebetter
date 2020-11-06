<template>
  <div class="home main-layout" v-loading="loading">
    <question-bubble
      v-for="question in questions"
      :key="question.id"
      :content="question"
    ></question-bubble>
  </div>
</template>

<script>
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';
import { db } from '@/firebase';

export default {
  name: 'Home',
  components: {
    QuestionBubble,
  },

  data() {
    return {
      loading: false,
      limit: 5,
      questions: [],
    };
  },

  computed: {
    isRefresh() {
      return this.$store.state.ui.isRefreshHome;
    },
  },

  watch: {
    isRefresh(value) {
      if (value) {
        this.getData();
        this.$store.commit('ui/refreshHome', false);
      }
    },
  },

  created() {
    this.getData();
  },

  methods: {
    async getData() {
      this.loading = true;
      const querySnapshot = await db
        .collection('questions')
        .orderBy('createdAt', 'desc')
        .limit(this.limit)
        .get();
      const questions = [];
      querySnapshot.forEach((doc) => {
        questions.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      this.questions = questions;
      this.loading = false;
    },
  },
};
</script>
