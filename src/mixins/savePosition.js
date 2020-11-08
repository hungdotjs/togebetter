export default {
  data() {
    return {
      scrollPosition: 0,
    };
  },

  activated() {
    window.scrollTo({ top: this.scrollPosition, left: 0 });
  },

  deactivated() {
    this.scrollPosition = window.pageYOffset;
  },
};
