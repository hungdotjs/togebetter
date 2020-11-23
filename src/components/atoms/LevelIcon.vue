<template>
  <div class="center-y mr-8">
    <slot name="prefix"></slot>
    <img :src="require(`@/assets/icons/${level}.svg`)" alt="#" :width="width" class="mx-8" />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: 'beginner',
    },

    width: {
      type: [String, Number],
      default: '16',
    },
  },
};
</script>
