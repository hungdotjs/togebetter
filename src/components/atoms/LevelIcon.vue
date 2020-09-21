<template>
  <div>
    <img :src="require(`@/assets/icons/${iconPath}.svg`)" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: '1',
    },
  },

  computed: {
    iconPath() {
      switch (this.level) {
        case '1':
          return 'beginner';
        default:
          return 'beginner';
      }
    },
  },
};
</script>
