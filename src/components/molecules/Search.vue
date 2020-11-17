<template>
  <div class="tb-search">
    <el-autocomplete
      class="tb-search__input"
      popper-class="tb-search__popper"
      ref="input"
      placeholder="Search questions"
      v-model="searchKey"
      prefix-icon="iconfont icon-search"
      clearable
      :trigger-on-focus="false"
      :fetch-suggestions="handleSearch"
      @select="handleSelect"
      @keyup.enter.native="goToSearchPage"
    >
      <template slot-scope="{ item }">
        <div class="color-secondary" style="font-size: 0.9em">
          {{ questionType(item.questionType) }}
        </div>
        <div
          v-if="item.content"
          class="text-truncate mb-8"
          v-html="highlightQuery(item.content)"
        ></div>
        <div>
          <el-tag type="success" size="small" class="mr-8" effect="plain">
            {{ item.lang | languageName }}
          </el-tag>
          <el-tag type="primary" size="small" class="mr-8" effect="plain">
            {{ item.votes }} votes
          </el-tag>
          <el-tag type="info" size="small" class="mr-8" effect="plain">
            {{ item.comments }} answers
          </el-tag>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import { questionsIndex } from '@/algolia';

export default {
  name: 'TbSearch',
  data() {
    return {
      searchKey: '',
      hits: [],
    };
  },

  mounted() {
    this.$refs.input.focus();
  },

  methods: {
    goTo(questionID) {
      this.$router.push({ name: 'questions-detail', params: { id: questionID } });
      this.$emit('close');
    },

    goToSearchPage() {
      if (this.$route.query.q === this.searchKey) return;
      this.$router.push({ name: 'search', query: { q: this.searchKey } });
      this.$refs.input.close();
      this.$emit('close');
    },

    handleSearch(query, cb) {
      questionsIndex
        .search(query, {
          hitsPerPage: 5,
        })
        .then(({ hits }) => {
          this.hits = hits;
          cb(hits);
          console.log(hits);
        });
    },

    handleSelect(item) {
      this.goTo(item.objectID);
    },

    highlightQuery(value) {
      if (!this.searchKey) return value;

      const regExp = new RegExp(this.searchKey.trim(), 'gi');
      const res = value.replace(regExp, `<b>${this.searchKey}</b>`);
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
