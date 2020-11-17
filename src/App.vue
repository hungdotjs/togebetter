<template>
  <div id="app">
    <navbar></navbar>
    <div :class="{ container: !hideSidebar, 'd-flex': !hideSidebar }">
      <div :class="[!hideSidebar && 'left-sidebar']" v-if="!hideSidebar">
        <left-sidebar></left-sidebar>
      </div>
      <div class="main-layout">
        <transition name="page-transition" mode="out-in">
          <keep-alive :include="['Home', 'Users']">
            <router-view :key="$route.params.id"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
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

  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .onSnapshot((doc) => {
            const userData = {
              id: user.uid,
              ...doc.data(),
            };
            this.$store.commit('auth/saveUser', { ...userData });
            localStorage.setItem('user', JSON.stringify(userData));
          });
      } else {
        this.$store.dispatch('auth/signOut');
      }
    });
  },
};
</script>
