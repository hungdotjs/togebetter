<template>
  <ol class="left-sidebar__links">
    <router-link
      v-if="user"
      tag="li"
      :to="`/users/${user.id}`"
      class="left-sidebar__item center-y"
      style="overflow: hidden"
      active-class="left-sidebar__item--active"
      exact
    >
      <el-avatar :src="user.photoURL" :size="32" class="mr-16" style="flex-shrink: 0"></el-avatar>
      <span>{{ user.username }}</span>
    </router-link>

    <router-link
      tag="li"
      to="/questions"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
      @click.native="refreshHome"
    >
      <img
        :src="require('@/assets/icons/questions.svg')"
        alt="#"
        class="left-sidebar__item__icon"
      />
      <span>Questions</span>
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

    <router-link
      v-if="user"
      tag="li"
      to="/questions-type"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
    >
      <img :src="require('@/assets/icons/ask.svg')" alt="#" class="left-sidebar__item__icon" />
      <span>Ask </span>
    </router-link>

    <router-link
      tag="li"
      to="/posts"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
    >
      <img :src="require('@/assets/icons/blog.svg')" alt="#" class="left-sidebar__item__icon" />
      <span>Discussions</span>
    </router-link>

    <router-link
      v-if="user"
      tag="li"
      to="/bookmarks"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
    >
      <img
        :src="require('@/assets/icons/bookmarks.svg')"
        alt="#"
        class="left-sidebar__item__icon"
      />
      <span>Bookmark</span>
    </router-link>

    <router-link
      tag="li"
      to="/users"
      class="left-sidebar__item"
      active-class="left-sidebar__item--active"
      exact
    >
      <img :src="require('@/assets/icons/ranking.svg')" alt="#" class="left-sidebar__item__icon" />
      <span>Leaderboard</span>
    </router-link>

    <li>
      <credit></credit>
    </li>
  </ol>
</template>

<script>
import Credit from '@/components/atoms/Credit.vue';

export default {
  components: {
    Credit,
  },

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
