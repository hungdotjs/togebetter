<template>
  <footer class="footer hero-bg">
    <img :src="require('@/assets/img/logo-white.png')" alt="#" class="footer__logo" />
    <div class="text-center text-small">KLTN Hưng - Huy KTPM2016</div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  padding: 16px 32px;
  background-position: center;

  &__logo {
    max-width: 200px;
  }
}
</style>
