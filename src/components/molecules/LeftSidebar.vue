<template>
  <ol class="left-sidebar__links">
    <router-link
      tag="li"
      to="/home"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
      exact
      @click.native="refreshHome"
    >
      <i class="iconfont icon-home"></i> Home
    </router-link>
    <!-- <router-link
      tag="li"
      to="/questions"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
      exact
    >
      <i class="iconfont icon-earth"></i> Question
    </router-link> -->
    <!-- <router-link
      tag="li"
      to="/tags"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
      exact
    >
      <i class="iconfont icon-tags"></i> Tags
    </router-link> -->
    <!-- <router-link
      tag="li"
      to="/users"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
    >
      <i class="iconfont icon-user"></i> Users
    </router-link> -->
    <router-link
      v-if="user"
      tag="li"
      to="/questions/type"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
    >
      <i class="iconfont icon-question"></i> Ask Question
    </router-link>
    <router-link
      v-if="user"
      tag="li"
      :to="`/users/${user.id}`"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
    >
      <i class="iconfont icon-user"></i> Profile
    </router-link>
    <router-link
      v-if="user"
      tag="li"
      to="/bookmarks"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
    >
      <i class="iconfont icon-bookmark"></i> Bookmarked
    </router-link>
  </ol>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    refreshHome() {
      this.$store.dispatch('ui/refreshHome', true);
    },
  },
};
</script>
