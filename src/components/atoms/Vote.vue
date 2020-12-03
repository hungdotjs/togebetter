<template>
  <div class="vote">
    <div
      class="vote__button"
      :class="[voted && 'vote__button--active', disabled && 'vote__button--disabled']"
      @click="handleVote"
    >
      <p>
        <i class="iconfont" :class="voted ? 'icon-heart-solid' : 'icon-heart'"></i>
        <span class="ml-8">{{ point }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Vote',
  props: {
    votes: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
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
      if (value) this.voted = this.votes.indexOf(this.user.id) !== -1;
    },
  },

  mounted() {
    this.point = this.votes.length;
    if (this.user) this.voted = this.votes.indexOf(this.user.id) !== -1;
  },

  methods: {
    handleVote() {
      if (this.disabled) return;

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
