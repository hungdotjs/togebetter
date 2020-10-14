<template>
  <div class="container home">
    <div>
      <question-bubble v-for="i in 3" :key="i" :totalAnswer="i - 1"></question-bubble>
    </div>
  </div>
</template>

<script>
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    QuestionBubble,
  },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
    }),
  },

  created() {},
};
</script>
