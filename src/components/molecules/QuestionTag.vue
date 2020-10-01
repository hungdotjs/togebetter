<template>
  <div class="question-tag" @click="goTo">
    <div class="question-tag__image center" :style="{ backgroundColor: iconBg }">
      <i :class="icon"></i>
    </div>
    <div class="question-tag__content">
      <div class="question-tag__title">
        {{ title }}
        <br />
        <span class="question-tag__subtitle text-small"> {{ subtitle }} </span>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionTag',
  props: {
    icon: {
      type: String,
    },
    iconBg: {
      type: String,
      default: '#000',
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    to: {
      type: [String, Object],
    },
  },
  data() {
    return {};
  },

  methods: {
    goTo() {
      this.$router.push(this.to);
    },
  },
};
</script>
