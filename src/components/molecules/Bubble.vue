<template>
  <div class="bubble">
    <el-avatar class="bubble__avatar" :src="avatar" :size="48"></el-avatar>

    <div class="bubble__content">
      <div class="bubble__name text-small">
        <p class="m-0 text-bold">{{ username }}</p>
        <p class="m-0">{{ time }}</p>
      </div>
      <div class="bubble__question">
        <!-- Slot  -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: {
      type: String,
      default: 'Sep 24 (2 hours ago)',
    },
    username: {
      type: String,
      default: 'hungteddy98',
    },
    avatar: {
      type: String,
      default: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    },
  },
  data() {
    return {};
  },
};
</script>
