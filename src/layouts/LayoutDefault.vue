<template>
  <div class="layout--default">
    <navbar></navbar>
    <main class="layout--default__main">
      <slot></slot>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/organisms/Navbar.vue';

export default {
  name: 'LayoutDefault',
  components: {
    Navbar,
  },
};
</script>
