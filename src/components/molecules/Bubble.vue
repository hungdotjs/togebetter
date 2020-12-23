<template>
  <div class="bubble">
    <div class="bubble__left">
      <el-image class="bubble__avatar" :src="avatar" fit="cover">
        <div slot="error" class="bubble__avatar--error">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <el-tooltip content="Featured answer" :open-delay="1000">
        <img
          v-if="checked"
          src="https://firebasestorage.googleapis.com/v0/b/togebetter.appspot.com/o/icon%2Ffeature-check.svg?alt=media&token=93bd0381-9270-4930-9135-1b2c17f9b893"
          width="32"
          height="32"
        />
      </el-tooltip>
    </div>

    <div class="bubble__content">
      <!-- :style="{ border: `1px solid ${borderColor}` }" -->
      <div class="bubble__question" :class="[hasEffect && 'bubble__question--effect']">
        <div v-if="checked" class="bubble__featured-answer">
          <i class="iconfont icon-crown"></i> Featured answer
        </div>

        <div class="bubble__header text-small">
          <p class="bubble__name" @click="goTo">{{ username }}</p>
          <div class="m-0">
            {{ time }}
          </div>
        </div>
        <div class="bubble__language">
          <div class="center-y">
            <i class="iconfont icon-earth mr-8"></i>{{ knowingCountry | countryName }}
          </div>
          <template v-if="!hideInterestLanguage">
            <div class="d-flex">
              <level-icon
                v-for="(item, i) in interestLanguages"
                :key="item.lang"
                :level="item.level"
              >
                <template #prefix>
                  <i v-if="i === 0" class="iconfont icon-edit mr-8"></i>
                  {{ item.lang | languageName }}
                </template>
              </level-icon>
            </div>
          </template>
        </div>
        <!-- Slot  -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import timeago from '@/helpers/timeago';
import { db } from '@/firebase';
import { mapState } from 'vuex';

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
      default: '',
    },
    hideInterestLanguage: {
      type: Boolean,
      default: false,
    },
    hasEffect: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    borderColor: {
      type: String,
    },
  },

  computed: {
    ...mapState({
      listUsers: (state) => state.ui.listUsers,
    }),

    time() {
      if (this.createdAt) return timeago(this.createdAt.toDate());
      return timeago(new Date());
    },
  },

  data() {
    return {
      avatar: '',
      username: '',
      nativeLanguage: '',
      interestLanguages: [],
      knowingCountry: '',
    };
  },

  async created() {
    const user = this.listUsers.find((item) => item.id === this.userID);
    let data;
    if (user) {
      data = user;
    } else {
      const doc = await db
        .collection('users')
        .doc(this.userID)
        .get();
      if (doc.exists) data = doc.data();
      else return;
    }

    this.$store.dispatch('ui/addUser', { id: this.userID, ...data });
    this.avatar = data.photoURL;
    this.username = data.username;
    this.nativeLanguage = data.nativeLanguage;
    this.interestLanguages = data.interestLanguages;
    this.knowingCountry = data.knowingCountry;
  },

  methods: {
    goTo() {
      this.$router.push({ name: 'profile', params: { id: this.userID } });
    },
  },
};
</script>
