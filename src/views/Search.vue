<template>
  <div class="search-page">
    <div class="search-page__header">
      <p class="search-page__title">
        <i class="iconfont icon-q"></i> Results for<b class="ml-8 color-primary">{{ query }}</b>
      </p>
      <p class="px-8 color-secondary">{{ total }} results</p>
    </div>
    <div class="search-page__content" v-loading="loading">
      <div>
        <div v-for="item in hits" :key="item.objectID" class="search-page__item">
          <div class="search-page__item__stat">
            <div class="search-page__item__box">
              <span>
                {{ item.votes }}
              </span>
              <span class="text-small">votes</span>
            </div>
            <div class="search-page__item__box">
              <span>
                {{ item.comments }}
              </span>
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

export default {
  name: 'Search',
  data() {
    return {
      query: '',
      hits: [],
      total: 0,
      pageSize: 10,
      loading: false,
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
    search() {
      this.loading = true;
      questionsIndex
        .search(this.query, {
          hitsPerPage: this.pageSize,
        })
        .then((res) => {
          this.hits = res.hits;
          this.total = res.nbHits;
          this.loading = false;
          console.log(res);
        });
    },

    handlePageChange(value) {
      this.loading = true;
      questionsIndex
        .search(this.query, {
          hitsPerPage: this.pageSize,
          page: value - 1,
        })
        .then((res) => {
          this.hits = res.hits;
          this.loading = false;
        });
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
