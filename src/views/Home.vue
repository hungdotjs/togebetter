<template>
  <div class="home">
    <h1>Hello</h1>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';

export default {
  name: 'Home',
  created() {
    // Set layout
    this.$emit('update:layout', LayoutDefault);
  },
};
</script>
