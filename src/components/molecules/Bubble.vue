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
          <level-icon :level="interestLanguageLevel">
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
import { db } from '@/firebase';
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
    createdAt: {
      required: true,
    },
  },

  computed: {
    time() {
      return this.createdAt.toDate();
    },
  },

  created() {
    db.collection('users')
      .doc(this.userID)
      .get()
      .then((res) => {
        const data = res.data();
        this.avatar = data.photoURL;
        this.username = data.username;
        this.nativeLanguage = languages.find((item) => item.code === data.nativeLanguage).name;
        this.interestLanguage = languages.find((item) => item.code === data.interestLanguage).name;
        this.interestLanguageLevel = data.interestLanguageLevel;
      });
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

  methods: {
    goTo() {
      this.$router.push({ name: 'profile', params: { id: this.userID } });
    },
  },
};
</script>
