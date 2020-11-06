<template>
  <div>
    <navbar></navbar>
    <main class="app__content">
      <div :class="{ container: !hideSidebar, 'd-flex': !hideSidebar }">
        <div :class="[!hideSidebar && 'left-sidebar']" v-if="!hideSidebar">
          <left-sidebar></left-sidebar>
        </div>
        <transition name="page-transition" mode="out-in">
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
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

  data() {
    return {
      blackList: ['landing-page', 'login', 'signup'],
    };
  },

  computed: {
    hideSidebar() {
      return this.blackList.includes(this.$route.name);
    },
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
            this.$store.commit('auth/saveUser', { id: user.uid, ...userData });
          });
      } else {
        this.$store.commit('auth/signOut');
      }
    });
  },
};
</script>
