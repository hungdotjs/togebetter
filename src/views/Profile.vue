<template>
  <div class="profile" v-loading="loading">
    <div class="profile__wrapper" v-if="currentUser">
      <div class="profile__overview">
        <div class="profile__avatar-wrapper">
          <el-image class="profile__avatar" :src="currentUser.photoURL"></el-image>
          <router-link
            tag="div"
            class="text-center"
            v-if="user && currentUser.id === user.id"
            :to="{ name: 'edit-profile', params: { id: user.id } }"
          >
            <el-button size="mini" icon="iconfont icon-edit" plain>
              Edit Profile
            </el-button>
          </router-link>
        </div>
        <div>
          <div class="profile__username">
            {{ currentUser.username }}
          </div>
          <p class="profile__time">
            <i class="el-icon-time"></i> Joined <timeago :datetime="time"></timeago>
          </p>
          <div class="profile__stats">
            <div class="profile__stats__item profile__stats__item--points">
              <span class="text-bold">
                <i class="iconfont icon-heart-solid"></i>
                {{ currentUser.points }}
              </span>
              <span> points </span>
            </div>
            <p class="profile__stats__item profile__stats__item--question">
              <span class="text-bold">
                <i class="iconfont icon-ask-question"></i>
                {{ currentUser.totalQuestions }}
              </span>
              <span> questions </span>
            </p>
            <p class="profile__stats__item profile__stats__item--answer">
              <span class="text-bold">
                <i class="iconfont icon-answer"></i>
                {{ currentUser.totalAnswers }}
              </span>
              <span> answers </span>
            </p>
          </div>
        </div>
      </div>

      <div class="p-16">
        <div class="profile__bio">
          <p class="text-bold">About me</p>
          <p class="profile__bio">
            {{ currentUser.bio }}
          </p>
        </div>
        <el-divider></el-divider>
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="iconfont icon-message"></i>
            Native language
          </p>
          <p>{{ currentUser.nativeLanguage | languageName }}</p>
        </div>
        <el-divider></el-divider>
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="el-icon-edit"></i>
            Language of interest
          </p>
          <level-icon :level="currentUser.interestLanguageLevel">
            {{ currentUser.interestLanguage | languageName }}
          </level-icon>
        </div>
        <el-divider></el-divider>
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="iconfont icon-earth"></i>
            Country or region they know well
          </p>
          <p>{{ currentUser.knowingCountry | countryName }}</p>
        </div>
        <el-divider></el-divider>
        <div class="profile__detail">
          <p class="profile__detail__title">
            <i class="iconfont icon-earth"></i>
            Countries and regions of interest
          </p>
          <p>{{ currentUser.interestCountry | countryName }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LevelIcon from '@/components/atoms/LevelIcon.vue';
import { mapState } from 'vuex';
import { db } from '@/firebase';

export default {
  name: 'Profile',
  components: { LevelIcon },

  data() {
    return {
      currentUser: null,
      loading: false,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),

    time() {
      if (this.currentUser) return this.currentUser.createdAt.toDate();
      return null;
    },
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      const userID = this.$route.params.id;
      this.loading = true;
      db.collection('users')
        .doc(userID)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const user = {
              id: doc.id,
              ...doc.data(),
            };
            this.currentUser = user;
            console.log(user);
            this.loading = false;
          } else {
            this.$router.push({ name: '404' });
          }
        });
    },
  },
};
</script>
