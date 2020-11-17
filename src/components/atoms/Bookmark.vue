<template>
  <div class="chat-bubble">
    <div
      class="chat-bubble__button"
      :class="{ 'chat-bubble__button--active': bookmarked }"
      @click="handleSave"
    >
      <p><i class="iconfont" :class="bookmarked ? 'icon-bookmark-solid' : 'icon-bookmark'"></i></p>
      <p class="chat-bubble__button__text">{{ bookmarked ? 'Saved' : 'Save' }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Bookmark',
  props: {
    bookmarks: {
      type: Array,
      default: () => [],
      required: true,
    },
    id: {
      type: String,
    },
  },

  data() {
    return {
      bookmarked: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  watch: {
    user(value) {
      if (value) this.bookmarked = this.bookmarks.indexOf(this.id) !== -1;
    },
  },

  mounted() {
    if (this.user) this.bookmarked = this.bookmarks.indexOf(this.id) !== -1;
  },

  methods: {
    handleSave() {
      if (this.bookmarked) {
        this.bookmarked = false;
        this.$emit('unsave');
      } else {
        this.bookmarked = true;
        this.$emit('save');
      }
    },
  },
};
</script>
