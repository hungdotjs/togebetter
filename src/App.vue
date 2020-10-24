<template>
  <div>
    <navbar></navbar>
    <main class="app__content">
      <transition name="page-transition" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/organisms/Navbar.vue';
import { auth } from '@/firebase';

export default {
  name: 'App',
  components: {
    Navbar,
  },

  watch: {
    $route() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
  },

  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('auth/saveUser', user.providerData[0]);
      } else {
        this.$store.commit('auth/signOut');
      }
    });
  },
};
</script>
