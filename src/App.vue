<template>
  <div id="app">
    <navbar></navbar>
    <div :class="{ container: !hideSidebar, 'd-flex': !hideSidebar }">
      <div :class="[!hideSidebar && 'left-sidebar']" v-if="!hideSidebar">
        <left-sidebar></left-sidebar>
      </div>
      <div class="main-layout" v-loading="loading">
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
      loading: false,
    };
  },

  computed: {
    hideSidebar() {
      return this.blackList.includes(this.$route.name);
    },

    notifications() {
      return this.$store.state.ui.notifications;
    },
  },

  mounted() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        this.loading = true;
        await db
          .collection('users')
          .doc(user.uid)
          .onSnapshot((doc) => {
            const userData = {
              id: user.uid,
              ...doc.data(),
            };
            this.$store.commit('auth/saveUser', { ...userData });
            localStorage.setItem('user', JSON.stringify(userData));
          });
        await db
          .collection('notifications')
          .where('receiveID', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .limit(10)
          .onSnapshot((querySnapshot) => {
            const notifications = [];
            querySnapshot.forEach((doc) => {
              notifications.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            this.$store.dispatch('ui/addNotifications', notifications);
          });
        this.loading = false;
      } else {
        this.$store.dispatch('auth/signOut');
      }
    });
  },
};
</script>
