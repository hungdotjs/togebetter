<template>
  <div class="page question-detail">
    <chat-bubble></chat-bubble>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import ChatBubble from '@/components/molecules/ChatBubble.vue';

export default {
  name: 'Home',
  components: {
    ChatBubble,
  },

  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
