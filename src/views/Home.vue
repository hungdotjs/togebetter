<template>
  <div
    class="home main-layout"
    v-loading="loading"
    v-infinite-scroll="load"
    infinite-scroll-immediate-check="false"
    infinite-scroll-throttle-delay="500"
    infinite-scroll-disabled="disabled"
  >
    <question-bubble
      v-for="question in questions"
      :key="question.id"
      :content="question"
    ></question-bubble>
    <div class="text-center">
      <p v-if="noMore">No more questions</p>
      <p v-if="scrollLoading"><i class="el-icon-loading"></i></p>
    </div>
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
      scrollLoading: false,
      noMore: false,
      limit: 5,
      lastDoc: null,
      questions: [],
    };
  },

  computed: {
    isRefresh() {
      return this.$store.state.ui.isRefreshHome;
    },

    disabled() {
      return this.scrollLoading || this.noMore;
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
    async load() {
      if (this.loading) return;

      this.scrollLoading = true;
      if (!this.lastDoc) {
        this.noMore = true;
        this.scrollLoading = false;
        return;
      }

      const querySnapshot = await db
        .collection('questions')
        .orderBy('createdAt', 'desc')
        .startAfter(this.lastDoc)
        .limit(this.limit)
        .get();
      // Get the last visible document
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

      const questions = [];
      querySnapshot.forEach((doc) => {
        questions.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      this.questions = this.questions.concat(questions);
      if (querySnapshot.docs.length < this.limit) {
        this.noMore = true;
      }
      this.scrollLoading = false;
    },

    async getData() {
      this.loading = true;
      const querySnapshot = await db
        .collection('questions')
        .orderBy('createdAt', 'desc')
        .limit(this.limit)
        .get();
      const questions = [];
      // Get the last visible document
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

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
