<template>
  <div class="bookmark">
    <div
      class="bookmark__button"
      :class="{ 'bookmark__button--active': bookmarked }"
      @click="handleVote"
    >
      <p><i class="iconfont" :class="bookmarkd ? 'icon-heart-solid' : 'icon-heart'"></i></p>
      <p class="bookmark__button__text">{{ point }}</p>
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
      required: true,
    },
  },

  data() {
    return {
      point: 0,
      voted: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  watch: {
    user(value) {
      if (value) this.voted = this.bookmarks.indexOf(this.user.id) !== -1;
    },
  },

  mounted() {
    this.point = this.votes.length;
    if (this.user) this.voted = this.votes.indexOf(this.user.id) !== -1;
  },

  methods: {
    handleVote() {
      if (this.voted) {
        this.point -= 1;
        this.voted = false;
        this.$emit('unvote');
      } else {
        this.point += 1;
        this.voted = true;
        this.$emit('vote');
      }
    },
  },
};
</script>
