<template>
  <div>
    <navbar></navbar>
    <main class="app__content">
      <div class="container d-flex">
        <left-sidebar></left-sidebar>
        <transition name="page-transition" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/organisms/Navbar.vue';
import LeftSidebar from '@/components/molecules/LeftSidebar.vue';
import { auth, db } from '@/firebase';

export default {
  name: 'App',
  components: {
    Navbar,
    LeftSidebar,
  },

  watch: {
    $route() {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    },
  },

  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then((res) => {
            const userData = res.data();
            this.$store.commit('auth/saveUser', userData);
          });
      } else {
        this.$store.commit('auth/signOut');
      }
    });
  },
};
</script>
