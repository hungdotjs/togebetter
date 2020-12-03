<template>
  <div
    class="home"
    v-infinite-scroll="load"
    infinite-scroll-immediate-check="false"
    infinite-scroll-throttle-delay="500"
    infinite-scroll-disabled="disabled"
    infinite-scroll-distance="100"
  >
    <div class="home__filter" v-if="user">
      <el-select v-model="filter" placeholder="Select" class="mr-8 grow-1" @change="getData">
        <el-option
          v-for="(item, i) in userLanguages"
          :key="i"
          :value="item"
          :label="filterLabel(item)"
        >
        </el-option>
      </el-select>
      <el-popover placement="bottom-end" trigger="click" v-model="popoverVisible">
        <div>
          <p>Question filters</p>
          <div class="home__filter__checkboxs">
            <el-checkbox v-model="filterUnanswer">Only unanswered questions</el-checkbox>
            <el-checkbox v-model="filterVoice">Only voice questions</el-checkbox>
            <div class="p-8 text-right">
              <el-button size="mini" @click="popoverVisible = false">Cancel</el-button>
              <el-button type="primary" size="mini" @click="getData">OK</el-button>
            </div>
          </div>
        </div>
        <el-button slot="reference" icon="el-icon-set-up" plain>Filter</el-button>
      </el-popover>
    </div>

    <div v-if="loading" class="skeleton-wrapper">
      <base-skeleton></base-skeleton>
      <base-skeleton></base-skeleton>
      <base-skeleton></base-skeleton>
    </div>
    <div v-else>
      <question-bubble
        v-for="question in questions"
        :key="question.id"
        :content="question"
      ></question-bubble>
    </div>
    <div class="text-center">
      <p v-if="noMore">No more questions</p>
      <div v-if="scrollLoading" class="skeleton-wrapper">
        <base-skeleton></base-skeleton>
        <base-skeleton></base-skeleton>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';
import BaseSkeleton from '@/components/atoms/BaseSkeleton.vue';
import savePosition from '@/mixins/savePosition';
import { db } from '@/firebase';

export default {
  name: 'Home',
  mixins: [savePosition],
  components: {
    QuestionBubble,
    BaseSkeleton,
  },

  data() {
    return {
      popoverVisible: false,
      flag: false,
      loading: false,
      scrollLoading: false,
      noMore: false,
      limit: 5,
      lastDoc: null,
      questions: [],
      filter: 'en',
      filterUnanswer: false,
      filterVoice: false,
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
    if (!this.user) {
      this.$router.push({ name: 'login' });
    }
    this.flag = true;
    this.$store.dispatch('ui/refreshHome', false);
  },

  deactivated() {
    this.flag = false;
  },

  mounted() {
    if (this.user) {
      const { nativeLanguage, interestLanguages } = this.user;
      const langs = interestLanguages.map((item) => item.lang);
      if (!langs.includes(nativeLanguage)) langs.push(nativeLanguage);
      this.userLanguages = this.userLanguages.concat(langs);
      this.getData();
    }
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

      let ref = db.collection('questions').where('lang', '==', this.filter);
      if (this.filterUnanswer) {
        ref = ref.where('comments', '==', []);
      }

      if (this.filterVoice) {
        ref = ref.where('audioURL', '!=', '').orderBy('audioURL', 'asc');
      }

      ref = ref
        .orderBy('createdAt', 'desc')
        .startAfter(this.lastDoc)
        .limit(this.limit);

      const querySnapshot = await ref.get();

      // Get the last visible document
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      const questions = [];
      querySnapshot.forEach((doc) => {
        questions.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      const timeout = setTimeout(() => {
        this.questions = this.questions.concat(questions);
        if (querySnapshot.docs.length < this.limit) {
          this.noMore = true;
        }
        this.scrollLoading = false;
        clearTimeout(timeout);
      }, 1000);
    },

    async getData() {
      this.loading = true;
      let ref = db.collection('questions').where('lang', '==', this.filter);
      if (this.filterUnanswer) {
        ref = ref.where('comments', '==', []);
      }

      if (this.filterVoice) {
        ref = ref.where('audioURL', '!=', '').orderBy('audioURL', 'asc');
      }

      ref = ref.orderBy('createdAt', 'desc').limit(this.limit);

      const querySnapshot = await ref.get();

      const questions = [];
      // Get the last visible document
      this.lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      querySnapshot.forEach((doc) => {
        questions.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(questions, ref);
      const timeout = setTimeout(() => {
        this.questions = questions;
        this.loading = false;
        clearTimeout(timeout);
      }, 500);
    },

    filterLabel(lang) {
      return `Question about ${this.$options.filters.languageName(lang)}`;
    },
  },
};
</script>
