<template>
  <div class="container">
    <div class="home main-layout">
      <question-bubble v-for="i in 3" :key="i" :totalAnswer="i - 1"></question-bubble>
    </div>
  </div>
</template>

<script>
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';

export default {
  name: 'Home',
  components: {
    QuestionBubble,
  },
};
</script>
