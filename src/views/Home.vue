<template>
  <div class="container home">
    <question-bubble v-for="i in 3" :key="i" :totalAnswer="i - 1"></question-bubble>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';

export default {
  name: 'Home',
  components: {
    QuestionBubble,
  },

  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
