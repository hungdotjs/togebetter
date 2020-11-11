<template>
  <div class="bubble">
    <el-image class="bubble__avatar" :src="avatar" fit="cover" lazy>
      <div slot="error" class="w-100 text-center">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>

    <div class="bubble__content">
      <div
        class="bubble__question"
        :class="[hasEffect && 'bubble__question--effect']"
        :style="{ border: `1px solid ${borderColor}` }"
      >
        <div class="bubble__header text-small">
          <p class="bubble__name" @click="goTo">{{ username }}</p>
          <div class="m-0">
            <timeago :datetime="time"> </timeago>
          </div>
        </div>
        <div class="bubble__language">
          <div class="center-y">
            <i class="iconfont icon-earth mr-8"></i>{{ knowingCountry | countryName }}
          </div>
          <level-icon :level="interestLanguageLevel" v-if="!hideInterestLanguage">
            <template #prefix>
              <i class="iconfont icon-edit mr-8"></i>
              {{ interestLanguage | languageName }}
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
    hasEffect: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
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
      knowingCountry: '',
    };
  },

  created() {
    const ref = database.ref(`users/${this.userID}`);
    ref.once('value').then((snapshot) => {
      const data = snapshot.val();
      this.$store.dispatch('ui/addUser', { id: this.userID, ...data });
      this.avatar = data.photoURL;
      this.username = data.username;
      this.nativeLanguage = data.nativeLanguage;
      this.interestLanguage = data.interestLanguage;
      this.knowingCountry = data.knowingCountry;
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
