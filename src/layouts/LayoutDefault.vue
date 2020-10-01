<template>
  <div class="layout--default">
    <navbar></navbar>
    <main class="layout--default__main">
      <transition name="page-transition" mode="out-in">
        <slot></slot>
      </transition>
    </main>
    <tb-footer></tb-footer>
  </div>
</template>

<script>
import Navbar from '@/components/organisms/Navbar.vue';
import TbFooter from '@/components/organisms/Footer.vue';

export default {
  name: 'LayoutDefault',
  components: {
    Navbar,
    TbFooter,
  },
};
</script>

<style lang="scss" scoped>
.layout--default__main {
  min-height: 90vh;
}
</style>
