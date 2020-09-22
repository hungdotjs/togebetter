<template>
  <div class="center-y">
    <img :src="require(`@/assets/icons/${iconPath}.svg`)" alt="#" :width="width" class="mr-8" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: '1',
    },

    width: {
      type: [String, Number],
      default: '16',
    },
  },

  computed: {
    iconPath() {
      switch (this.level) {
        case '1':
          return 'beginner';
        case '2':
          return 'beginner-intermediate';
        case '3':
          return 'intermediate';
        case '4':
          return 'advanced';
        default:
          return 'beginner';
      }
    },
  },
};
</script>
