<template>
  <div class="container home" v-if="isLogin">
    <div>
      <question-bubble v-for="i in 3" :key="i" :totalAnswer="i - 1"></question-bubble>
    </div>
  </div>
  <div v-else>
    <div class="hero">
      <video
        autoplay
        loop
        src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/video.mp4?alt=media&token=46c9f9dc-7837-4e44-972b-fe0ca07bdbdf"
        class="hero__video"
      ></video>
      <div class="hero__title">
        <div class="mb-16 text-center">
          <h1>LOGO</h1>
          <p>Learn foreign languages for free</p>
          <p>A language learning Q&A app</p>
        </div>
        <p>Search questions about</p>
        <el-select placeholder="Select" class="mb-16 w-100">
          <el-option label="English (US)" value="en_us"> </el-option>
        </el-select>
        <el-input>
          <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import QuestionBubble from '@/components/molecules/QuestionBubble.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    QuestionBubble,
  },

  computed: {
    ...mapState({
      isLogin: (state) => state.user.isLogin,
    }),
  },

  created() {
    if (this.isLogin) {
      // Set layout
      this.$emit('update:layout', LayoutDefault);
    }
  },
};
</script>

<style lang="scss" scoped>
@mixin coverer {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

.hero {
  position: relative;
  width: 100%;
  height: 100vh;

  &__video {
    @include coverer;
    object-fit: cover;
  }

  &__title {
    @include coverer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 16px;
    color: #fff;
    background-color: rgba($color: #000000, $alpha: 0.3);
  }
}
</style>
