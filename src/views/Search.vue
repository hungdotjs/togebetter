<template>
  <div class="search-page box-content">
    <div class="search-page__header">
      <p class="search-page__title">
        <i class="iconfont icon-q"></i> Search Results for
        <b class="ml-8 color-primary">
          {{ query }}
        </b>
      </p>
      <div class="mb-16" style="max-width: 300px">
        <p class="text-secondary">Filter by Language</p>
        <select-language
          :value.sync="filter.lang"
          style="max-width: 200px"
          @change="applyFilter"
        ></select-language>
      </div>
      <p class="px-8 color-secondary">{{ total }} results</p>
    </div>
    <div class="search-page__content" v-loading="loading">
      <div
        v-for="item in hits"
        :key="item.objectID"
        class="search-page__item"
        @click="goTo(item.objectID)"
      >
        <div class="search-page__item__stat">
          <div class="search-page__item__box search-page__item__box--primary">
            <strong> {{ item.votes }} </strong>
            <span class="text-small">votes</span>
          </div>
          <div
            class="search-page__item__box search-page__item__box--secondary"
            :class="item.haveFeatured && 'search-page__item__box--featured'"
          >
            <strong> {{ item.answers }} </strong>
            <span class="text-small">answers</span>
          </div>
        </div>
        <div>
          <p class="color-secondary" style="font-size: 0.9em">
            {{ questionType(item.questionType) }}
          </p>
          <div
            v-if="item.content"
            class="text-truncate mb-8"
            v-html="highlightQuery(item.content)"
          ></div>
          <el-tag type="success" size="small" class="mr-8" effect="plain">
            {{ item.lang | languageName }}
          </el-tag>
        </div>
      </div>
    </div>
    <div class="text-center" v-if="total > pageSize">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { questionsIndex } from '@/algolia';
import SelectLanguage from '@/components/atoms/SelectLanguage.vue';

export default {
  name: 'Search',
  components: {
    SelectLanguage,
  },

  data() {
    return {
      query: '',
      hits: [],
      total: 0,
      pageSize: 5,
      loading: false,
      filter: {
        lang: 'en',
      },
    };
  },

  mounted() {
    this.query = this.$route.query.q;
    this.search();
  },

  watch: {
    $route(to) {
      const newQuery = to.query.q;
      if (this.query === newQuery) return;
      this.query = to.query.q;
      this.search();
    },
  },

  methods: {
    goTo(questionID) {
      this.$router.push({ name: 'questions-detail', params: { id: questionID } });
    },

    search() {
      this.loading = true;
      questionsIndex
        .search(this.query, {
          filters: `lang:${this.filter.lang}`,
          hitsPerPage: this.pageSize,
        })
        .then((res) => {
          this.hits = res.hits;
          this.total = res.nbHits;
          const timeout = setTimeout(() => {
            this.loading = false;
            clearTimeout(timeout);
          }, 500);
        });
    },

    handlePageChange(value) {
      this.loading = true;
      questionsIndex
        .search(this.query, {
          filters: `lang:${this.filter.lang}`,
          hitsPerPage: this.pageSize,
          page: value - 1,
        })
        .then((res) => {
          this.hits = res.hits;
          this.loading = false;
        });
    },

    applyFilter() {
      this.search();
    },

    highlightQuery(value) {
      if (!this.query) return value;

      const regExp = new RegExp(this.query.trim(), 'gi');
      const res = value.replace(regExp, `<b>${this.query}</b>`);
      return res;
    },

    questionType(type) {
      switch (type) {
        case 'how-say':
          return 'How do you say this?';
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
};
</script>
