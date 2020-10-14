<template>
  <div>
    <navbar></navbar>
    <main class="app__content">
      <transition name="page-transition" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <tb-footer></tb-footer>
  </div>
</template>

<script>
import Navbar from '@/components/organisms/Navbar.vue';
import TbFooter from '@/components/organisms/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    TbFooter,
  },

  watch: {
    $route() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
  },
};
</script>
