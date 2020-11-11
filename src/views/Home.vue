<template>
  <div
    class="home"
    v-infinite-scroll="load"
    infinite-scroll-immediate-check="false"
    infinite-scroll-throttle-delay="500"
    infinite-scroll-disabled="disabled"
  >
    <div class="home__filter" v-if="user">
      <el-select v-model="filter" placeholder="Select" class="mr-8 grow-1">
        <el-option
          v-for="(item, i) in userLanguages"
          :key="i"
          :value="item"
          :label="filterLabel(item)"
        >
        </el-option>
      </el-select>
      <el-popover placement="bottom-end" trigger="click">
        <div>Data</div>
        <el-button slot="reference" icon="el-icon-set-up" plain>Filter</el-button>
      </el-popover>
    </div>
    <div v-loading="loading">
      <question-bubble
        v-for="question in questions"
        :key="question.id"
        :content="question"
      ></question-bubble>
    </div>
    <div class="text-center">
      <p v-if="noMore">No more questions</p>
      <p v-if="scrollLoading"><i class="el-icon-loading"></i></p>
    </div>
  </div>
</template>

<script>
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';
import { db } from '@/firebase';
import savePosition from '@/mixins/savePosition';

export default {
  name: 'Home',
  mixins: [savePosition],
  components: {
    QuestionBubble,
  },

  data() {
    return {
      flag: false,
      loading: false,
      scrollLoading: false,
      noMore: false,
      limit: 5,
      lastDoc: null,
      questions: [],
      filter: '',
      userLanguages: [],
    };
  },

  computed: {
    user() {
      return this.$store.state.auth.user;
    },

    isRefresh() {
      return this.$store.state.ui.isRefreshHome;
    },

    disabled() {
      return this.scrollLoading || this.noMore;
    },
  },

  watch: {
    isRefresh(value) {
      if (value && this.flag) {
        console.log('refresh');
        this.getData();
        this.scrollLoading = false;
        this.noMore = false;
        this.$store.dispatch('ui/refreshHome', false);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    },
  },

  activated() {
    this.flag = true;
    this.$store.dispatch('ui/refreshHome', false);
  },

  deactivated() {
    this.flag = false;
  },

  mounted() {
    const { nativeLanguage, interestLanguage } = this.user;
    this.filter = interestLanguage;
    this.userLanguages = this.userLanguages.concat([interestLanguage, nativeLanguage]);
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

    filterLabel(lang) {
      return `Question about ${this.$options.filters.languageName(lang)}`;
    },
  },
};
</script>
