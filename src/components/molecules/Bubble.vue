<template>
  <div class="bubble">
    <el-avatar class="bubble__avatar" :src="avatar" :size="48"></el-avatar>

    <div class="bubble__content">
      <div class="bubble__question">
        <div class="bubble__header text-small">
          <p class="bubble__name" @click="goTo">{{ username }}</p>
          <div class="m-0">
            <timeago :datetime="time"> </timeago>
          </div>
        </div>
        <div class="bubble__language">
          <div class="center-y"><i class="el-icon-s-comment mr-8"></i>{{ nativeLanguage }}</div>
          <level-icon :level="interestLanguageLevel" v-if="!hideInterestLanguage">
            <template #prefix>
              <i class="el-icon-edit mr-8"></i>
              {{ interestLanguage }}
            </template>
          </level-icon>
        </div>
        <!-- Slot  -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import languages from '@/data/languages';

export default {
  components: {
    LevelIcon,
  },

  props: {
    userID: {
      type: String,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    createdAt: {
      required: true,
    },
    hideInterestLanguage: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    time() {
      return this.createdAt.toDate();
    },
  },

  data() {
    return {
      avatar: '',
      username: '',
      nativeLanguage: '',
      interestLanguage: '',
      interestLanguageLevel: 'beginner',
    };
  },

  created() {
    this.avatar = this.userInfo.photoURL;
    this.username = this.userInfo.username;
    this.nativeLanguage = languages.find((item) => item.code === this.userInfo.nativeLanguage).name;
    this.interestLanguage = languages.find(
      (item) => item.code === this.userInfo.interestLanguage,
    ).name;
    this.interestLanguageLevel = this.userInfo.interestLanguageLevel;
  },

  methods: {
    goTo() {
      this.$router.push({ name: 'users', params: { id: this.userID } });
    },
  },
};
</script>
