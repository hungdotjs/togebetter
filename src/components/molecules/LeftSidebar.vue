<template>
  <div class="left-sidebar">
    <ol class="left-sidebar__links">
      <router-link
        tag="li"
        to="/home"
        class="left-sidebar__item"
        active-class="left-sidebar__item--active"
        exact
      >
        <i class="iconfont icon-home"></i> Home
      </router-link>
      <router-link
        tag="li"
        to="/questions"
        class="left-sidebar__item"
        active-class="left-sidebar__item--active"
        exact
      >
        <i class="iconfont icon-earth"></i> Question
      </router-link>
      <router-link
        tag="li"
        to="/tags"
        class="left-sidebar__item"
        active-class="left-sidebar__item--active"
        exact
      >
        <i class="iconfont icon-tags"></i> Tags
      </router-link>
      <router-link
        tag="li"
        to="/users"
        class="left-sidebar__item"
        active-class="left-sidebar__item--active"
        exact
      >
        <i class="iconfont icon-user"></i> Users
      </router-link>
    </ol>
  </div>
</template>

<script>
export default {};
</script>
