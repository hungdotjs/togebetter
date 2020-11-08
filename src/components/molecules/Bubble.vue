<template>
  <div class="bubble">
    <el-image class="bubble__avatar" :src="avatar" fit="cover" lazy> </el-image>

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
import { database } from '@/firebase';

export default {
  name: 'Bubble',
  components: {
    LevelIcon,
  },

  props: {
    userID: {
      type: String,
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
      if (this.createdAt) return this.createdAt.toDate();
      return new Date();
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
    const ref = database.ref(`users/${this.userID}`);
    ref.once('value').then((snapshot) => {
      const data = snapshot.val();
      this.avatar = data.photoURL;
      this.username = data.username;
      this.nativeLanguage = languages.find((item) => item.code === data.nativeLanguage).name;
      this.interestLanguage = languages.find((item) => item.code === data.interestLanguage).name;
      this.interestLanguageLevel = data.interestLanguageLevel;
    });
  },

  methods: {
    goTo() {
      this.$router.push({ name: 'profile', params: { id: this.userID } });
    },
  },
};
</script>
