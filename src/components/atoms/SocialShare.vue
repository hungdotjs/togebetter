<template>
  <div>
    <el-tooltip :content="$t('share')">
      <div class="chat-bubble__button" @click="visible = true">
        <p><i class="iconfont icon-share-fill"></i></p>
      </div>
    </el-tooltip>
    <el-dialog title="Share" :visible.sync="visible" custom-class="base-dialog">
      <div class="d-flex">
        <div class="text-center">
          <ShareNetwork
            network="facebook"
            :url="url"
            :title="title"
            :description="description"
            hashtags="togebetter"
          >
            <button class="share__button">
              <img :src="require(`@/assets/icons/facebook.svg`)" alt="#" class="p-8" />
            </button>
          </ShareNetwork>
          <p>Facebook</p>
        </div>
        <div class="ml-16 text-center">
          <ShareNetwork network="twitter" :url="url" :title="title" hashtags="togebetter">
            <button class="share__button">
              <img :src="require(`@/assets/icons/twitter.svg`)" alt="#" class="p-8" />
            </button>
          </ShareNetwork>
          <p>Twitter</p>
        </div>
        <!-- <div class="ml-16 text-center">
          <ShareNetwork network="email" :url="url" :title="title" :description="description">
            <button class="share__button">
              <img :src="require(`@/assets/icons/email.svg`)" alt="#" class="p-8" />
            </button>
          </ShareNetwork>
          <p>Email</p>
        </div> -->
        <div class="ml-16 text-center">
          <ShareNetwork network="quora" :url="url" :title="title" :description="description">
            <button class="share__button">
              <img :src="require(`@/assets/icons/quora.svg`)" alt="#" class="p-8" />
            </button>
          </ShareNetwork>
          <p>Quora</p>
        </div>
      </div>
      <el-input v-model="url"></el-input>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SocialShare',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      url: '',
      visible: false,
    };
  },

  mounted() {
    this.url = window.location.href;
  },
};
</script>

<style lang="scss" scoped>
.share {
  &__button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background-color: transparent;

    &:hover {
      background-color: #eee;
      transition: all 0.3s;
    }
  }
}
</style>
